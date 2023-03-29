package a402.FaST.model.dto;

import a402.FaST.model.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

   private String email;
   private String password;
   private String nickname;
   private String salt;
   private String imgPath;

}