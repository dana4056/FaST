package a402.FaST.model.dto;

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
   private String lat;
   private String lng;
   private String area;

}