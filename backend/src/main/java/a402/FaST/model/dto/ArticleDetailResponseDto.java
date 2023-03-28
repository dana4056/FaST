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
public class ArticleDetailResponseDto {

   private int id;
   private int userId;
   private String nickName;
   private String imgPath;
   private String content;
   private LocalDateTime createTime;
   private int likeCount;
   private int commentCount;
   private String let;
   private String lng;
   private boolean likeCheck;
   private List<TagResponseDto> tags;

}
