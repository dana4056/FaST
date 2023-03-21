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
public class UserFromFollowResponseDto {

   private int id;
   private String email;
   private String nickname;
   private List<FollowerResponseDto> follower;

   public static UserFromFollowResponseDto from(User user) {
      if(user == null) return null;
         return UserFromFollowResponseDto.builder()
                 .id(user.getId())
                 .email(user.getEmail())
                 .nickname(user.getNickname())
                 .follower(user.getToId().stream()
                         .map(follower->new FollowerResponseDto(follower)).collect(Collectors.toList()))
                 .build();
   }
}
