package a402.FaST.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReplyModifyDto {

   private int commentReplyId;
   private String content;
   private int userId;
}