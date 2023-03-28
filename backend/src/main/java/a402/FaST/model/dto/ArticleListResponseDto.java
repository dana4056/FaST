package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleListResponseDto {

   private int id;
   private int userId;
   private String nickName;
   private String imgPath;
   private LocalDateTime createTime;
   private int commentCount;
   private int likeCount;
   private boolean likeCheck;
   private List<TagResponseDto> tags;


}
