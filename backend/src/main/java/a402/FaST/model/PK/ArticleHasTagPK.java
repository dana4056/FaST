package a402.FaST.model.PK;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
public class ArticleHasTagPK implements Serializable {

    private Long tag;
    private int article;
}
