package a402.FaST.model.dto;

import a402.FaST.model.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModifyPasswordRequestDto {

   private String password;
   private String newPassword;


}