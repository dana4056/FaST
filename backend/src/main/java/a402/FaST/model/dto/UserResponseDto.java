package a402.FaST.model.dto;

import a402.FaST.model.entity.User;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

   private int id;

   private String email;

   private String nickname;

   private String salt;

   private String imgPath;

   private Set<AuthorityDto> authorityDtoSet;

   public static UserResponseDto from(User user) {
      if(user == null) return null;

      return UserResponseDto.builder()
              .id(user.getId())
              .email(user.getEmail())
              .nickname(user.getNickname())
              .salt(user.getSalt())
              .imgPath(user.getImg_path())
              .authorityDtoSet(user.getAuthorities().stream()
                      .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                      .collect(Collectors.toSet()))
              .build();
   }
}