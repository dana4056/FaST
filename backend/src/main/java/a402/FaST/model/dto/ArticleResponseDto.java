package a402.FaST.model.dto;

import a402.FaST.model.entity.Article;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponseDto {
   private int id;
   private String imgPath;
   private String content;
   private LocalDateTime createTime;
   private int likeCount;
   private int commentCount;
   private String let;
   private String lng;
   private int user;

   public static ArticleResponseDto from(Article article) {
      if(article == null) return null;
         return ArticleResponseDto.builder()
                 .id(article.getId())
                 .imgPath(article.getImgPath())
                 .content(article.getContent())
                 .createTime(article.getCreateTime())
                 .likeCount(article.getLikeCount())
                 .commentCount(article.getCommentCount())
                 .let(article.getLet())
                 .lng(article.getLng())
                 .user(article.getUser().getId())
                 .build();
   }
}