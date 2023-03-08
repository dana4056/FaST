package a402.FaST.Controller;

import a402.FaST.jwt.JwtFilter;
import a402.FaST.jwt.TokenProvider;
import a402.FaST.model.dto.LoginDto;
import a402.FaST.model.dto.TokenDto;
import a402.FaST.model.dto.UserDto;
import a402.FaST.service.EmailService;
import a402.FaST.service.EmailServiceImpl;
import a402.FaST.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api(tags = "User Controller")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final EmailServiceImpl emailService;

    // 회원가입 메소드
    @PostMapping("/signup")
    @Operation(summary = "회원가입 API =>  json 형식 데이터 -> (username, password, nickname)", description = "json 형식 데이터 -> (username, password, nickname)")
    public ResponseEntity<UserDto> signup(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/login")
    @Operation(summary = "로그인 API =>  json 형식 데이터 -> (email, password, nickname)", description = "json 형식 데이터 -> (username, password, nickname)")
    private ResponseEntity<Map<String, Object>> login(@RequestBody LoginDto loginDto) {

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        TokenDto TokenResponseDto = null;
        LoginDto LoginResponseDto = null;
        try {
            TokenResponseDto = userService.login(loginDto);
            System.out.println(TokenResponseDto);
//            LoginResponseDto = userService.getLoginUser(userLoginRequestDto.getId());
            resultMap.put("token", TokenResponseDto);
            resultMap.put("user", LoginResponseDto);
        } catch (Exception e) {
            resultMap.put("error", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @PostMapping("/signup/email")
    public String emailConfirm(@RequestParam String email) throws Exception {

        String confirm = emailService.signUPMessage(email);

        return confirm;
    }

    @GetMapping("/user")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    @GetMapping("/user/{username}")
//    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
    }



}
