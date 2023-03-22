package a402.FaST.model.entity;

import a402.FaST.model.PK.ArticleHasTagPK;
import a402.FaST.model.PK.TagHasUserPK;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "article_has_tag")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ArticleHasTagPK.class)
public class ArticleHasTag {

    @Id
    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name="article_id")
    private Article article;

    @Id
    @ManyToOne(targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinColumn(name="tag_id")
    private Tag tag;

}
