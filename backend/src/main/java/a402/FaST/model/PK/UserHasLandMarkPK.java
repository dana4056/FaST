package a402.FaST.model.PK;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class UserHasLandMarkPK implements Serializable {

    private int user;
    private int landMark;
}
