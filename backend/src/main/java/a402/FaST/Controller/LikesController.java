package a402.FaST.Controller;

import a402.FaST.model.dto.TagRequestDto;
import a402.FaST.model.dto.UserResponseDto;
import a402.FaST.service.LikesServiceImpl;
import a402.FaST.service.TagServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
@Api(tags = "Likes Controller")
public class LikesController {

    private static final Logger logger = LoggerFactory.getLogger(LikesController.class);

    private final LikesServiceImpl likesService;

    @GetMapping("/article")
    @Operation(summary = "게시글 좋아요 API =>  게시글 좋아요 추가하는 API 입니다.",
            description = "RequestParam 형식 데이터 -> (int : articleId, int : userId)" +
                    " => 좋아요 수를 Return 해줍니다. -> 만약 좋아요 상태면 좋아요 취소")
    public ResponseEntity likeArticle (@Valid @RequestParam int articleId, @RequestParam int userId)  {
        int cnt = likesService.likeArticle(articleId, userId);
        return ResponseEntity.ok(cnt);
    }

    @GetMapping("/comment")
    @Operation(summary = "댓글 좋아요 API =>  댓글 좋아요 추가하는 API 입니다.",
            description = "RequestParam 형식 데이터 -> (int : commentId, int : userId)" +
                    " => 좋아요 수를 Return 해줍니다. -> 만약 좋아요 상태면 좋아요 취소")
    public ResponseEntity likeComment (@Valid @RequestParam int commentId, @RequestParam int userId)  {
        int cnt = likesService.likeComment(commentId, userId);
        return ResponseEntity.ok(cnt);
    }

    @GetMapping("/commentReply")
    @Operation(summary = "대댓글 좋아요 API =>  대댓글 좋아요 추가하는 API 입니다.",
            description = "RequestParam 형식 데이터 -> (int : commentReplyId, int : userId)" +
                    " => 좋아요 수를 Return 해줍니다. -> 만약 좋아요 상태면 좋아요 취소")
    public ResponseEntity likeCommentReply (@Valid @RequestParam int commentReplyId, @RequestParam int userId)  {
        int cnt = likesService.likeCommentReply(commentReplyId, userId);
        return ResponseEntity.ok(cnt);
    }


}
