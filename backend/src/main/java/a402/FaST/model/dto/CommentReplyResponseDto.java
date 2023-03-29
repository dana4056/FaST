package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReplyResponseDto {
   private int id;
   private int userId;
   private int articleId;
   private int commentId;
   private String content;
   private LocalDateTime createTime;
   private int likeCount;

}