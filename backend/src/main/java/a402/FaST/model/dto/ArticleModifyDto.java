package a402.FaST.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleModifyDto {

   private int userId;
   private int articleId;
   private String imgPath;
   private String content;
   private String let;
   private String lng;
   private List<String> tags;
}