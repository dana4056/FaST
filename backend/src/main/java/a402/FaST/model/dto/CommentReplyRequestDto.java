package a402.FaST.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReplyRequestDto {

   private String content;
   private int commentId;
   private int userId;
}