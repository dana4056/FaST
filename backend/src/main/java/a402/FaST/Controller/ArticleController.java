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
    @ApiOperation("게시글 생성 : RequestParam으로 (title, content, user_id, room_id, picture = 파일)")
    public ResponseEntity<?> create(@Valid @RequestBody ArticleRequestDto requestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        ArticleCommentResponseDto responseDto = null;
        responseDto = articleService.create(requestDto);
        return ResponseEntity.ok(responseDto);
//        BoardResponseCommentDto boardResponseCommentDto = null;
//
//        try {
//            boardResponseCommentDto = boardService.join(title, content, user.getUsername(), room_id, picture);
//            resultMap.put("newBoard", boardResponseCommentDto);
//        } catch (Exception e) {
//            resultMap.put("error", e.getMessage());
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }


    }




}
