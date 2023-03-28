package a402.FaST.Controller;

import a402.FaST.jwt.TokenProvider;
import a402.FaST.model.dto.*;
import a402.FaST.model.entity.User;
import a402.FaST.repository.UserRepository;
import a402.FaST.service.CertServiceImpl;
import a402.FaST.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Api(tags = "User Controller")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserServiceImpl userService;
    private final CertServiceImpl certService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입 API =>  유저 정보를 입력받아 회원가입하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String : password, String : nickname) " +
            " => 회원가입에 완료한 User 정보를 Return 해줍니다.  => 만약 이메일 중복이나 닉네임 중복이면 error 메시지 반환")
    public ResponseEntity<UserResponseDto> signup(@Valid @RequestBody UserRequestDto requestDto) {
        UserResponseDto responseDto = null;
        if (userService.checkMail(requestDto) && userService.checkNickname(requestDto)){
            responseDto = userService.signup(requestDto);
        }
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인 API =>  아이디, 비밀번호 입력을 통해 로그인하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String : password)" +
            " => 로그인에 완료한 User 정보와 Token 정보를 Return 해줍니다.")
    private ResponseEntity<UserResponseDto> login(@Valid @RequestBody UserRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        TokenDto TokenResponseDto = null;
        UserResponseDto userResponseDto = null;

        try {
            TokenResponseDto = userService.getToken(requestDto);
            userResponseDto = userService.getUser(requestDto);
            String authorization = TokenResponseDto.getToken();
            headers.set("Authorization", "Bearer"+" "+ authorization);
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<UserResponseDto>(userResponseDto, headers, status);
    }

    @PostMapping("/send-email")
    @Operation(summary = "이메일 전송 API =>  이메일 입력을 통해 이메일을 전송하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email)" +
                    " => 이메일로 전송한 인증번호를 Return 해줍니다.")
    public void sendEmail(@Valid @RequestBody CertRequestDto requestDto) throws Exception {
        certService.sendMessage(requestDto);
    }

    @PostMapping("/check-code")
    @Operation(summary = "인증번호 검증 API =>  이메일로 전송한 인증번호와 사용자 인증번호를 검증하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String : code)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity checkCode(@Valid @RequestBody CertRequestDto requestDto) throws Exception {
        boolean check = certService.checkMessage(requestDto);
        return ResponseEntity.ok(check);
    }

    @PostMapping("/temp-password")
    @Operation(summary = "임시 비밀번호 발급 API =>  이메일로 임시로 재설정한 비밀번호를 보내주는 API 입니다.",
            description = "json 형식 데이터 -> (String : email)" +
                    " => void Return 해줍니다.")
    public void tempPassword(@Valid @RequestBody UserRequestDto requestDto) throws Exception {
        userService.tempPassword(requestDto);
    }

    @PostMapping("/token")
    @Operation(summary = "소셜 로그인 조회 API =>  JWT 토큰으로 소셜 로그인한 정보를 가져옵니다",
            description = "json 형식 데이터 -> (String : token)" +
                    " => User 정보를 Return 해줍니다.")
    public ResponseEntity<Map<String, Object>> tokenUser(@RequestBody TokenDto token) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;

        Map<String, Object> tempMap = userService.findByJwtUser(token);
        String email = (String) tempMap.get("email");
        String provider = (String) tempMap.get("provider");
        logger.info("email : {}", email);
        logger.info("provider : {}", provider);

        UserResponseDto userResponseDto = null;
        userResponseDto = userService.findJwtUser(email,provider);
        resultMap.put("user", userResponseDto);

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @GetMapping("/{id}")
    @Operation(summary = "유저 조회 API =>  유저 ID로 특정 유저 조회하는 API 입니다.",
            description = "PathVariable 형식 데이터 -> (int : id)" +
                    " => UserResponseDto Return 해줍니다.")
    public ResponseEntity<UserResponseDto> findUser(@Valid @PathVariable int id) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.findUser(id);
        return ResponseEntity.ok(userResponseDto);
    }

    @GetMapping("/salt/{email}")
    @Operation(summary = "salt 조회 API =>  유저 salt를 조회하는 API 입니다.",
            description = "PathVariable 형식 데이터 -> (String : email)" +
                    " => salt 값이나 error return 해줍니다.")
    public ResponseEntity<String> findSalt(@Valid @PathVariable String email) throws Exception {
        String salt = userService.findSalt(email);
        return ResponseEntity.ok(salt);
    }

    @PutMapping("/{id}/nickname")
    @Operation(summary = "유저 닉네임 수정 API =>  유저 닉네임 수정 API 입니다.",
            description = "PathVariable 형식 데이터 + json 형식 데이터 -> (int : id) + (String : nickname)" +
                    " => 검증 결과에 따라 UserResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> modifyNickname(@Valid @PathVariable int id, @RequestBody UserRequestDto requestDto) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.modifyNickname(id,requestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/{id}/modify-password")
    @Operation(summary = "유저 비밀번호 수정 API =>  유저 비밀번호 수정 API 입니다.",
            description = "PathVariable 형식 데이터 + json 형식 데이터 -> (int : id) + (String : password, String : newPassword)" +
                    " => 검증 결과에 따라 userResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> modifyPassword(@Valid @PathVariable int id, @RequestBody UserModifyPasswordRequestDto requestDto) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.modifyPassword(id,requestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/{id}/modify-img")
    @Operation(summary = "유저 프로필 수정 API =>  유저 프로필 수정 API 입니다.",
            description = "PathVariable 형식 데이터 + json 형식 데이터 -> (int : id) + (String : imgPath)" +
                    " => 검증 결과에 따라 userResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> modifyImg(@Valid @PathVariable int id, @RequestBody UserModifyImgRequestDto requestDto) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.modifyImg(id,requestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/{id}/modify-user")
    @Operation(summary = "유저 수정 API =>  유저 수정 API (닉네임, 프로필, 태그) 입니다.",
            description = "PathVariable 형식 데이터 + json 형식 데이터 -> (int : id) + (String : nick)" +
                    " => 검증 결과에 따라 userResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> modifyUser(@Valid @PathVariable int id, @RequestBody UserModifyUserRequestDto requestDto) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.modifyUser(id,requestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/find-pw")
    @Operation(summary = "유저 비밀번호 찾기 API =>  유저 비밀번호 찾는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String password, String salt)" +
                    " => 검증 결과에 따라 userResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> modifyImg(@Valid @RequestBody UserFindPwDto requestDto) throws Exception {
        UserResponseDto userResponseDto = null;
        userResponseDto = userService.findPw(requestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "유저 탈퇴 API =>  유저 탈퇴하는 API 입니다.",
            description = "PathVariable 형식 데이터 -> (int : id)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity deleteUser(@Valid @PathVariable int id) throws Exception {
        boolean check = userService.deleteUser(id);
        return ResponseEntity.ok(check);
    }


//    만약 권한 쓰고 싶으면 이렇게 사용
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")


}
