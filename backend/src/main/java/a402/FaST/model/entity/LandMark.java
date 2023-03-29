package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "landmark")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LandMark {

    @Id
    private String name;

    @OneToMany(mappedBy = "landMark", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<UserHasLandMark> users = new ArrayList<>();
}
