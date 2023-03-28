package a402.FaST.model.dto;

import a402.FaST.model.entity.Follow;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowingResponseDto {
    private FollowAllResponseDto toUser;

    public FollowingResponseDto(Follow follow) {
        this.toUser = FollowAllResponseDto.builder()
                .id(follow.getToId().getId())
                .imgPath(follow.getToId().getImgPath())
                .nickname(follow.getToId().getNickname())
                .build();
    }
}