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
   private LocalDateTime createTime = LocalDateTime.now();



   public CommentResponseDto from(Comment comment) {
      if (comment == null) return null;
      return CommentResponseDto.builder()
              .id(comment.getId())
              .content(comment.getContent())
              .createTime(comment.getCreateTime())
              .build();
   }
}