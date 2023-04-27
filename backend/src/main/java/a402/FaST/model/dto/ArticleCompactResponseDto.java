package a402.FaST.model.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleCompactResponseDto {
   private int id;
   private int userId;
   private String imgPath;
   private String lat;
   private String lng;
   private LocalDateTime createTime;

}
