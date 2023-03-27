package a402.FaST.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserFindPwDto {

   private String email;

   private String password;

   private String salt;


}