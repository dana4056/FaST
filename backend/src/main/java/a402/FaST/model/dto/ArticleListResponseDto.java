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

   private String imgPath;
   private LocalDateTime createTime;
   private int likeCount;
   private boolean likeCheck;
   private String nickName;
   private List<TagResponseDto> tags;


}
