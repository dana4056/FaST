package a402.FaST.model.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDetailResponseDto {

   private int id;
   private UserProfileDto user;
   private boolean followingCheck;
   private String imgPath;
   private String content;
   private LocalDateTime createTime;
   private String lat;
   private String lng;
   private String area;
   private int commentCount;
   private int likeCount;
   private boolean likeCheck;
   private List<TagResponseDto> tags;

}
