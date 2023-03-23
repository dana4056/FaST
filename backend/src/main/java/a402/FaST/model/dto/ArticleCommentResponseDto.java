package a402.FaST.model.dto;

import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCommentResponseDto {

   private int id;
   private String img_path;
   private String content;
   private LocalDateTime createTime;
   private int like_count;
   private int comment_count;
   private String let;
   private String lng;
   private List<CommentResponseDto> commentList;


   public static ArticleCommentResponseDto from(Article article) {
      if(article == null) return null;
         return ArticleCommentResponseDto.builder()
                 .id(article.getId())
                 .img_path(article.getImg_path())
                 .content(article.getContent())
                 .createTime(article.getCreateTime())
                 .like_count(article.getLike_count())
                 .comment_count(article.getComment_count())
                 .let(article.getLet())
                 .lng(article.getLng())
                 .commentList(article.getComments().stream()
                         .map(x->new CommentResponseDto(x)).collect(Collectors.toList()))
                 .build();
   }
}

//                 .commentList(article.getComments().stream()
//                         .map(x->CommentResponseDto.builder()
//                                 .id(x.getArticle().getId())
//                                 .content(x.getArticle().getContent())
//                                 .createTime(x.getArticle().getCreateTime()).build()).collect(Collectors.toList()))