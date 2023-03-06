package a402.FaST.service;

import java.util.Collections;

import a402.FaST.Util.SecurityUtil;
import a402.FaST.exception.DuplicateMemberException;
import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.jwt.TokenProvider;
import a402.FaST.model.dto.LoginDto;
import a402.FaST.model.dto.TokenDto;
import a402.FaST.model.dto.UserDto;
import a402.FaST.model.entity.Authority;
import a402.FaST.model.entity.User;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        // 아이디가 존재하지 않으면 권한 정보를 만든다
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        // 만든 권한 정보 바탕으로 User정보를 만든다
        User user = User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority))
                .build();

        return UserDto.from(userRepository.save(user));
    }

    // email 정보를 바탕으로 User 객체와 권한 정보를 가져온다
    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String email) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
    }

    // 현재 SecurityContext에만 있는 User 객체와 권한 정보를 가져온다
    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByEmail)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }

    public TokenDto login(LoginDto loginDto) throws Exception {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

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

}
