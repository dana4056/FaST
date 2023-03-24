package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;
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
   private String let;
   private String lng;
   private List<String> tags;
}