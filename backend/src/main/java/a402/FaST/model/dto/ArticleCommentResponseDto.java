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
public class ArticleCommentResponseDto {

   private int id;
   private String imgPath;
   private String content;
   private LocalDateTime createTime;
   private int likeCount;
   private int commentCount;
   private String let;
   private String lng;
//   private List<CommentResponseDto> commentList;
   private boolean likeCheck;
   private List<TagResponseDto> tags;


   public static ArticleCommentResponseDto from(Article article) {
      if(article == null) return null;
         return ArticleCommentResponseDto.builder()
                 .id(article.getId())
                 .imgPath(article.getImgPath())
                 .content(article.getContent())
                 .createTime(article.getCreateTime())
                 .likeCount(article.getLikeCount())
                 .commentCount(article.getCommentCount())
                 .let(article.getLet())
                 .lng(article.getLng())
//                 .commentList(article.getComments().stream()
//                         .map(comment->CommentResponseDto.builder()
//                                 .articleId(comment.getArticle().getId())
//                                 .content(comment.getContent())
//                                 .createTime(comment.getCreateTime())
//                                 .articleId(comment.getArticle().getId())
//                                 .userId(comment.getUser().getId())
//                                 .build()).collect(Collectors.toList()))
                 .tags(article.getTags().stream()
                         .map((Tag -> TagResponseDto.builder()
                                 .tagId(Tag.getTag().getId())
                                 .tagName(Tag.getTag().getName())
                                 .build()))
                         .collect(Collectors.toList()))
                 .build();
   }
}
