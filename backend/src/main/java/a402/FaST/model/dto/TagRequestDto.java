package a402.FaST.model.dto;

import a402.FaST.model.entity.Tag;
import a402.FaST.model.entity.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagRequestDto {

   private String email;
   private List<String> tags;

}