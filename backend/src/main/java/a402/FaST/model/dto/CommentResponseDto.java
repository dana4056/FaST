package a402.FaST.model.dto;

import a402.FaST.model.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
   private int id;
   private String content;
   private LocalDateTime createTime;
   private int articleId;
   private int userId;

   public CommentResponseDto(Comment comment) {
      this.id = comment.getId();
      this.content = comment.getContent();
      this.createTime = comment.getCreateTime();
      this.articleId = comment.getArticle().getId();
      this.userId = comment.getUser().getId();
   }


   public CommentResponseDto from(Comment comment) {
      if (comment == null) return null;
      return CommentResponseDto.builder()
              .id(comment.getId())
              .content(comment.getContent())
              .createTime(comment.getCreateTime())
              .articleId(comment.getArticle().getId())
              .userId(comment.getUser().getId())
              .build();
   }
}