package a402.FaST.service;

import java.util.Collections;
import java.util.Random;

import a402.FaST.Controller.UserController;
import a402.FaST.exception.DuplicateMemberException;
import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.jwt.TokenProvider;
import a402.FaST.model.dto.TokenDto;
import a402.FaST.model.dto.UserResponseDto;
import a402.FaST.model.dto.UserRequestDto;
import a402.FaST.model.entity.Authority;
import a402.FaST.model.entity.Cert;
import a402.FaST.model.entity.User;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import static a402.FaST.service.CertServiceImpl.createKey;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JavaMailSender emailSender;
    public static final String ePw = createKey();

    public UserResponseDto signup(UserRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        // 아이디가 존재하지 않으면 권한 정보를 만든다
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        // 만든 권한 정보 바탕으로 User정보를 만든다
        User user = User.builder()
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .nickname(requestDto.getNickname())
                .salt((requestDto.getSalt()))
                .img_path(requestDto.getImgPath())
                .authorities(Collections.singleton(authority))
                .build();

        return UserResponseDto.from(userRepository.save(user));
    }

    public TokenDto getToken(UserRequestDto requestDto) throws Exception {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());
        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 객체를 SecurityContext에 저장한다
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // authentication 객체를 통해 JWT 토큰 생성
        String jwt = tokenProvider.createToken(authentication);

//        JWT Token을 ResponseHeader에도 넣어주고 TokenDto를 통해 ResponseBody에도 넣어서 리턴 해준다
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
//        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);

        // 4. RefreshToken 저장
//        RefreshToken refreshToken = RefreshToken.builder()
//                .key(authentication.getName())
//                .value(tokenDto.getRefreshToken())
//                .build();
//
//        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return new TokenDto(jwt);
    }

    @Override
    public UserResponseDto getUser(UserRequestDto requestDto) {

        UserResponseDto userResponseDto = null;
        User user = userRepository.findByEmail(requestDto.getEmail()).get();
        if (user != null){
            userResponseDto = UserResponseDto.from(user);
            return userResponseDto;
        }else{
            throw new NotFoundMemberException("없는 유저입니다.");
        }

    }

    @Override
    public Boolean checkMail(UserRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateMemberException("이미 존재하는 이메일 입니다.");
        }
        return true;
    }

    @Override
    public Boolean checkNickname(UserRequestDto requestDto) {
        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new DuplicateMemberException("이미 존재하는 닉네임 입니다.");
        }
        return true;
    }

    @Override
    public Boolean deleteUser(int id) {
        if(!userRepository.existsById(id)){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            userRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public UserResponseDto modifyNickname(int id, UserRequestDto requestDto) {
        UserResponseDto userResponseDto = null;
        if(!userRepository.existsById(id)){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(id).get();
            user.setNickname(requestDto.getNickname());
            userResponseDto = UserResponseDto.from(user);
        }
        return userResponseDto;
    }

    @Override
    public void tempPassword(UserRequestDto requestDto) throws Exception {
        MimeMessage message = createMessage(requestDto.getEmail());
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }

        if (!userRepository.existsByEmail(requestDto.getEmail())) {
            throw new NotFoundMemberException("없는 유저 입니다.");
        }

        User user = userRepository.findByEmail(requestDto.getEmail()).get();
        user.setPassword(ePw);

    }

    @Override
    public UserResponseDto findUser(int id) {
        UserResponseDto userResponseDto = null;
        if(!userRepository.existsById(id)){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(id).get();
            userResponseDto = UserResponseDto.from(user);
        }
        return userResponseDto;
    }

    //    // email 정보를 바탕으로 User 객체와 권한 정보를 가져온다
//    @Transactional(readOnly = true)
//    public UserDto getUserWithAuthorities(String email) {
//        return UserDto.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
//    }
//
//    // 현재 SecurityContext에만 있는 User 객체와 권한 정보를 가져온다
//    @Transactional(readOnly = true)
//    public UserDto getMyUserWithAuthorities() {
//        return UserDto.from(
//                SecurityUtil.getCurrentUsername()
//                        .flatMap(userRepository::findOneWithAuthoritiesByEmail)
//                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
//        );
//    }

// -------------------------------메일 부분--------------------------------------------------
    private MimeMessage createMessage(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ePw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상
        message.setSubject("비밀번호 재설정 메일");//제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 안녕하세요 Fast 서비스입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 복사해 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>재설정된 비밀번호 입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("a402fast@gmail.com","fastAdmin"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

}
