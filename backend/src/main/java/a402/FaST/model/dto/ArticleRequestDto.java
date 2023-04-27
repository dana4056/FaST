package a402.FaST.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleRequestDto {

   private int userId;
   private String imgPath;
   private String content;
   private String lat;
   private String lng;
   private String area;
   // 수동 태그
   private List<String> tags;
   // 자동 태그
   private List<String> autoTags;
}