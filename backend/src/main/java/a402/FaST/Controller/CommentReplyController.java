package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.service.CommentReplyServiceImpl;
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
@RequestMapping("/commentReply")
@Api(tags = "CommentReply Controller")
public class CommentReplyController {

    private static final Logger logger = LoggerFactory.getLogger(CommentReplyController.class);
    private final CommentReplyServiceImpl commentReplyService;

    @PostMapping
    @Operation(summary = "대댓글 생성 API =>  대댓글 생성하는 API 입니다.",
            description = "json 형식 데이터 -> (String : content, int : articleId, int : userId)" +
                    " => 검증 결과에 따라 CommentReplyResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<CommentReplyResponseDto> create(@Valid @RequestBody CommentReplyRequestDto requestDto) {
        CommentReplyResponseDto responseDto = null;
        responseDto = commentReplyService.create(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("{id}/{userId}")
    @Operation(summary = "대댓글 삭제 API =>  대댓글 삭제하는 API 입니다.",
            description = "PathVariable 형식 데이터 (int : id, int : userId)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity delete(@Valid @PathVariable("id") int id, @PathVariable("userId") int userId) throws Exception {
        boolean check = commentReplyService.deleteCommentReply(id,userId);
        return ResponseEntity.ok(check);
    }

    @PutMapping("/modify-commentReply")
    @Operation(summary = "대댓글 수정 API =>  대댓글 수정하는 API 입니다.",
            description = "json 형식 데이터 -> (int : commentReplyId, String : content, int : userId)" +
                    " => 검증 결과에 따라 CommentReplyResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<CommentReplyResponseDto> modifyCommentReply(@Valid @RequestBody CommentReplyModifyDto modifyDto) throws Exception {
        CommentReplyResponseDto responseDto = null;
        responseDto = commentReplyService.modify(modifyDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{commentId}/{userId}/{size}/{offset}")
    @Operation(summary = "게시글에 있는 댓글 조회 API =>  게시글에 존재하는 댓글 조회하는 API 입니다.",
            description = "PathVariable 형식 데이터 (int : commentId, int : userId, int : size(받을 데이터 개수), int : offset(이에 따른 페이지 번호)" +
                    " => CommentListReplyResponseDto 를 Return 해줍니다.")
    public List<CommentReplyListResponseDto> commentList(@Valid @PathVariable("commentId") int commentId, @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset) {
        return commentReplyService.commentReplyList(commentId, userId, size, offset);
    }


}
