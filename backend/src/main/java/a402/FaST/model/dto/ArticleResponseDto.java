package a402.FaST.model.dto;

import a402.FaST.model.entity.Article;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponseDto {
   private int id;
   private String img_path;
   private String content;
   private LocalDateTime createTime;
   private int like_count;
   private int comment_count;
   private String let;
   private String lng;
   private int user;

   public static ArticleResponseDto from(Article article) {
      if(article == null) return null;
         return ArticleResponseDto.builder()
                 .id(article.getId())
                 .img_path(article.getImg_path())
                 .content(article.getContent())
                 .createTime(article.getCreateTime())
                 .like_count(article.getLike_count())
                 .comment_count(article.getComment_count())
                 .let(article.getLet())
                 .lng(article.getLng())
                 .user(article.getUser().getId())
                 .build();
   }
}