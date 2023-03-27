package a402.FaST.model.dto;

import a402.FaST.model.entity.ArticleHasTag;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagResponseDto {
   private int tagId;
   private String tagName;

}