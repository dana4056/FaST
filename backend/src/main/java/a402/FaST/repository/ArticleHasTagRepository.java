package a402.FaST.repository;


import a402.FaST.model.PK.ArticleHasTagPK;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.ArticleHasTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleHasTagRepository extends JpaRepository<ArticleHasTag, ArticleHasTagPK> {

    void deleteAllByArticleId(int articleId);
}
