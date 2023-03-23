package a402.FaST.model.dto;

import a402.FaST.model.entity.Follow;
import a402.FaST.model.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowingResponseDto {
    private UserResponseDto toUser;

    public FollowingResponseDto(Follow follow) {
        this.toUser = UserResponseDto.builder()
                .id(follow.getFromId().getId())
                .imgPath(follow.getFromId().getImg_path())
                .nickname(follow.getFromId().getNickname())
                .build();
    }
}