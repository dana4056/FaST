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
   private String content;
   private LocalDateTime createTime;
   private int userId;
   private String nickName;

}
