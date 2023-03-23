package a402.FaST.model.PK;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class FollowPK implements Serializable {

    private int fromId;
    private int toId;
}
