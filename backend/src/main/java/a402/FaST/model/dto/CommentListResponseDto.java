package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentListResponseDto {

   private int id;
   private int userId;
   private String content;
   private LocalDateTime createTime;
   private String nickName;
   private String imgPath;
   private int likeCount;
   private boolean likeCheck;
   private int commentReplyCount;

}
