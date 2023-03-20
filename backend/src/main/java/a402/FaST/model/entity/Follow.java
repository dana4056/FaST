package a402.FaST.model.entity;

import a402.FaST.model.PK.FollowPK;
import a402.FaST.model.PK.TagHasUserPK;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "follow")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(FollowPK.class)
public class Follow {

    @Id
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="from_id")
    private User fromId;
    @Id
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="to_id")
    private User toId;
}
