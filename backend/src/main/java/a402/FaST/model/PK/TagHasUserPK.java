package a402.FaST.model.PK;

import a402.FaST.model.entity.Tag;
import a402.FaST.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class TagHasUserPK implements Serializable {

    private int user;
    private int tag;
}
