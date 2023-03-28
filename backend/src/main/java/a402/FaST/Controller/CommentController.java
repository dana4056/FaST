package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.service.ArticleServiceImpl;
import a402.FaST.service.CommentServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
@Api(tags = "Comment Controller")
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);
    private final CommentServiceImpl commentService;

    @PostMapping
    @Operation(summary = "댓글 생성 API =>  댓글 생성하는 API 입니다.",
            description = "json 형식 데이터 -> (String content, int articleId, int userId)" +
                    " => 검증 결과에 따라 CommentResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<CommentResponseDto> create(@Valid @RequestBody CommentRequestDto requestDto) {
        CommentResponseDto responseDto = null;
        responseDto = commentService.create(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("{id}/{userId}")
    @Operation(summary = "댓글 삭제 API =>  댓글 삭제하는 API 입니다.",
            description = "PathVariable 형식 데이터 (int : id, int : userId)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity delete(@Valid @PathVariable("id") int id, @PathVariable("userId") int userId) throws Exception {
        boolean check = commentService.deleteComment(id,userId);
        return ResponseEntity.ok(check);
    }
//
    @PutMapping("/modify-comment")
    @Operation(summary = "댓글 수정 API =>  댓글 수정하는 API 입니다.",
            description = "json 형식 데이터 -> (int commentId, String content, int userId)" +
                    " => 검증 결과에 따라 CommentResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<CommentResponseDto> modifyComment(@Valid @RequestBody CommentModifyDto modifyDto) throws Exception {
        CommentResponseDto responseDto = null;
        responseDto = commentService.modify(modifyDto);
        return ResponseEntity.ok(responseDto);
    }
//
    @GetMapping("/{articleId}/{userId}/{size}/{offset}")
    @Operation(summary = "게시글에 있는 댓글 조회 API =>  게시글에 존재하는 댓글 조회하는 API 입니다.",
            description = "size = 받을 데이터 개수 -> offset = 이에 따른 페이지 번호" +
                    " => CommentListResponseDto 를 Return 해줍니다.")
    public List<CommentListResponseDto> commentList(@Valid @PathVariable("articleId") int articleId, @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset) {
        return commentService.commentList(articleId, userId, size, offset);
    }


}
