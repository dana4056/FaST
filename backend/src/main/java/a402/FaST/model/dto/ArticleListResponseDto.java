package a402.FaST.model.dto;

import a402.FaST.model.entity.Article;
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
   private int likeCount;
   private boolean likeCheck;
   private String nickName;
   private LocalDateTime createTime;
   private List<TagResponseDto> tags;


   public ArticleListResponseDto(String getimgPath, LocalDateTime getcreateTime) {
      this.nickName = "asd";
      this.likeCheck = false;
      this.likeCount = 0;
      this.createTime = getcreateTime;
      this.imgPath = getimgPath;
   }
}
