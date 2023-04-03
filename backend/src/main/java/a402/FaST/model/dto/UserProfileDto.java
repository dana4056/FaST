package a402.FaST.model.dto;

import a402.FaST.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
	private int id;

	private String nickname;

	private String imgPath;

	public UserProfileDto (User user) {
		this.id = user.getId();
		this.nickname = user.getNickname();
		this.imgPath = user.getImgPath();
	}
}
