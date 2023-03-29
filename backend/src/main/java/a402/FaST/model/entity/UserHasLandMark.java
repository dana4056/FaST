package a402.FaST.model.entity;

import a402.FaST.model.PK.UserHasLandMarkPK;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "user_has_landmark")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserHasLandMarkPK.class)
public class UserHasLandMark {

    @Id
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Id
    @ManyToOne(targetEntity = LandMark.class, fetch = FetchType.LAZY)
    @JoinColumn(name="landMark_name")
    private LandMark landMark;

}
