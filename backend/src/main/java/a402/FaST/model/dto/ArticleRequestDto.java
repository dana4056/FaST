package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleRequestDto {

   private int id;
   private String img_path;
   private String content;
//   private LocalDateTime createTime;
//   private int like_count;
//   private int comment_count;
   private String let;
   private String lng;
}