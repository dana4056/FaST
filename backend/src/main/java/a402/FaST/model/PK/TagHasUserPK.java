package a402.FaST.model.PK;

import a402.FaST.model.entity.Tag;
import a402.FaST.model.entity.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class TagHasUserPK implements Serializable {

    private User user;
    private Tag tag;
}
