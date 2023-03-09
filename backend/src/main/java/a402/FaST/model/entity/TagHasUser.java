package a402.FaST.model.entity;

import a402.FaST.model.PK.TagHasUserPK;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tag_has_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(TagHasUserPK.class)
public class TagHasUser {

    @Id
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Id
    @ManyToOne(targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinColumn(name="tag_id")
    private Tag tag;

}
