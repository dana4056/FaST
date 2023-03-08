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
    @Operation(summary = "회원가입 API =>  json 형식 데이터 -> (email, nickname, password)", description = "json 형식 데이터 -> (email, nickname, password)")
    public ResponseEntity<UserResponseDto> signup(@Valid @RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(userService.signup(requestDto));
    }

    // 로그인 메소드
    @PostMapping("/login")
    @Operation(summary = "로그인 API =>  json 형식 데이터 -> (email, password, nickname)", description = "json 형식 데이터 -> (username, password, nickname)")
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
    public String sendEmail(@Valid @RequestBody CertRequestDto requestDto) throws Exception {

        String confirm = certService.sendMessage(requestDto);

        return confirm;
    }

    @PostMapping("/user/check-code")
    public ResponseEntity checkCode(@Valid @RequestBody CertRequestDto requestDto) throws Exception {

        boolean check = certService.checkMessage(requestDto);

        return ResponseEntity.ok(check);
    }

    @PostMapping("/user/check-mail")
    public ResponseEntity checkMail(@Valid @RequestBody UserRequestDto requestDto) throws Exception {

        boolean check = userService.checkMail(requestDto);

        return ResponseEntity.ok(check);
    }

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
