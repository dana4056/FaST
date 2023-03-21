package a402.FaST.model.dto;

import a402.FaST.model.entity.Follow;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowRequestDto {

   private int fromId;
   private int toId;

}