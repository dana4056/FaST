package a402.FaST.model.dto;

import a402.FaST.model.entity.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserNotFollowResponseDto {

   private String nickname;
   private String img_path;

   public static UserNotFollowResponseDto from(String nickname, String img_path) {
      return UserNotFollowResponseDto.builder()
              .nickname(nickname)
              .img_path(img_path)
              .build();
   }
}
