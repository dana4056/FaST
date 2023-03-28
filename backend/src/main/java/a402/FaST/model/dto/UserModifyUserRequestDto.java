package a402.FaST.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModifyUserRequestDto {
   private String nickname;
   private String imgPath;


}