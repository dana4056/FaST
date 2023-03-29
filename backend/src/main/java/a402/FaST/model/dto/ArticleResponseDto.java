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
   private int userId;
   private String imgPath;
   private String content;
   private LocalDateTime createTime;
   private int likeCount;
   private int commentCount;
   private String let;
   private String lng;

}