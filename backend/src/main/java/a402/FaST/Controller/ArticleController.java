package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.service.ArticleServiceImpl;
import a402.FaST.service.CertServiceImpl;
import a402.FaST.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
@Api(tags = "Article Controller")
public class ArticleController {

    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);
    private final ArticleServiceImpl articleService;

    @PostMapping
    @Operation(summary = "게시글 생성 API =>  게시글 생성하는 API 입니다.",
            description = "json 형식 데이터 -> (int : userId, String img_path, String content, String let, String lng)" +
                    " => 검증 결과에 따라 ArticleResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<ArticleResponseDto> create(@Valid @RequestBody ArticleRequestDto requestDto) {
        ArticleResponseDto responseDto = null;
        responseDto = articleService.create(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("{id}/{userId}")
    @Operation(summary = "게시글 삭제 API =>  게시글 삭제하는 API 입니다.",
            description = "PathVariable 형식 데이터 (int : id, int : userId)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity delete(@Valid @PathVariable("id") int id, @PathVariable("userId") int userId) throws Exception {
        boolean check = articleService.deleteArticle(id,userId);
        return ResponseEntity.ok(check);
    }


}
