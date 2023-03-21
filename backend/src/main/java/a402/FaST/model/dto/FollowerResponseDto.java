package a402.FaST.model.dto;

import a402.FaST.model.entity.Follow;
import a402.FaST.model.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowerResponseDto {
    private UserResponseDto fromUser;

    public FollowerResponseDto(Follow from) {
        this.fromUser = UserResponseDto.from(from.getFromId());
    }
}