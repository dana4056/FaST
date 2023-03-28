package a402.FaST.model.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModifyUserRequestDto {
   private String nickname;
   private String imgPath;
   private List<String> tags;
}