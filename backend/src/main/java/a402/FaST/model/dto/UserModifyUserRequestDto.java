package a402.FaST.model.dto;

import lombok.*;

import java.util.List;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModifyUserRequestDto {
   private String nickName;
   private String imgPath;
   private List<String> tags;
}