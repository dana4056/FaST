package a402.FaST.Controller;

import a402.FaST.model.dto.CertRequestDto;
import a402.FaST.model.dto.TokenDto;
import a402.FaST.model.dto.UserResponseDto;
import a402.FaST.model.dto.UserRequestDto;
import a402.FaST.service.CertServiceImpl;
import a402.FaST.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "User Controller")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserServiceImpl userService;
    private final CertServiceImpl certService;

    // 회원가입 메소드
    @PostMapping("/user")
    @Operation(summary = "회원가입 API =>  유저 정보를 입력받아 회원가입하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String : password, String : nickname) " +
            " => 회원가입에 완료한 User 정보를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> signup(@Valid @RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(userService.signup(requestDto));
    }

    // 로그인 메소드
    @PostMapping("/login")
    @Operation(summary = "로그인 API =>  아이디, 비밀번호 입력을 통해 로그인하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email, String : password)" +
            " => 로그인에 완료한 User 정보와 Token 정보를 Return 해줍니다.")
    private ResponseEntity<Map<String, Object>> login(@RequestBody UserRequestDto requestDto) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        TokenDto TokenResponseDto = null;
        UserResponseDto userResponseDto = null;
        try {
            TokenResponseDto = userService.getToken(requestDto);
            userResponseDto = userService.getUser(requestDto);
            resultMap.put("token", TokenResponseDto);
            resultMap.put("user", userResponseDto);
        } catch (Exception e) {
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping("/user/send-email")
    @Operation(summary = "이메일 전송 API =>  이메일 입력을 통해 이메일을 전송하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email)" +
                    " => 이메일로 전송한 인증번호를 Return 해줍니다.")
    public String sendEmail(@Valid @RequestBody CertRequestDto requestDto) throws Exception {

        String confirm = certService.sendMessage(requestDto);

        return confirm;
    }

    @PostMapping("/user/check-code")
    @Operation(summary = "인증번호 검증 API =>  이메일로 전송한 인증번호와 사용자 인증번호를 검증하는 API 입니다.",
            description = "json 형식 데이터 -> (String : code)" +
                    " => 검증 결과에 따라 True or False 를 Return 해줍니다.")
    public ResponseEntity checkCode(@Valid @RequestBody CertRequestDto requestDto) throws Exception {

        boolean check = certService.checkMessage(requestDto);

        return ResponseEntity.ok(check);
    }

    @PostMapping("/user/check-mail")
    @Operation(summary = "이메일 중복검사 API =>  이메일 중복 검사하는 API 입니다.",
            description = "json 형식 데이터 -> (String : email)" +
                    " => 검증 결과에 따라 True or False 를 Return 해줍니다.")
    public ResponseEntity checkMail(@Valid @RequestBody UserRequestDto requestDto) throws Exception {

        boolean check = userService.checkMail(requestDto);

        return ResponseEntity.ok(check);
    }

    @PostMapping("/user/check-nick")
    @Operation(summary = "닉네임 중복검사 API =>  닉네임 중복 검사하는 API 입니다.",
            description = "json 형식 데이터 -> (String : nickname)" +
                    " => 검증 결과에 따라 True or False 를 Return 해줍니다.")
    public ResponseEntity checkNickname(@Valid @RequestBody UserRequestDto requestDto) throws Exception {

        boolean check = userService.checkNickname(requestDto);

        return ResponseEntity.ok(check);
    }

//    @DeleteMapping("/user/{id}")
//    @Operation(summary = "닉네임 중복검사 API =>  닉네임 중복 검사하는 API 입니다.",
//            description = "json 형식 데이터 -> (String : nickname)" +
//                    " => 검증 결과에 따라 True or False 를 Return 해줍니다.")
//    public ResponseEntity checkNickname(@Valid @RequestBody UserRequestDto requestDto) throws Exception {
//
//        boolean check = userService.checkNickname(requestDto);
//
//        return ResponseEntity.ok(check);
//    }

//    @GetMapping("/user")
////    @PreAuthorize("hasAnyRole('USER','ADMIN')")
//    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
//        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
//    }
//
//    @GetMapping("/user/{username}")
////    @PreAuthorize("hasAnyRole('ADMIN')")
//    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
//    }



}
