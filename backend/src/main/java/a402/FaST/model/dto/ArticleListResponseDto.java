package a402.FaST.model.dto;

import a402.FaST.model.entity.Article;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Getter
@Setter
@NoArgsConstructor
public class ArticleListResponseDto {
   public ArticleListResponseDto(Article article) {
      this.imgPath = article.getImgPath();
      this.nickName = article.getUser().getNickname();
   }

   private String imgPath;
//   private int likeCount;
//   private boolean likeCheck;
   private String nickName;
   private LocalDateTime createTime;
//   private List<TagResponseDto> tags;


}
