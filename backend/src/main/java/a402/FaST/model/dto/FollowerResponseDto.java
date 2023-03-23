package a402.FaST.model.dto;

import a402.FaST.model.entity.Follow;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowerResponseDto {
    private FollowAllResponseDto fromUser;

    public FollowerResponseDto(Follow follow) {
        this.fromUser = FollowAllResponseDto.builder()
                .id(follow.getFromId().getId())
                .imgPath(follow.getFromId().getImg_path())
                .nickname(follow.getFromId().getNickname())
                .build();
    }
}