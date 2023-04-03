package a402.FaST.repository;

import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.geom.Area;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query(value = "select * from article a where a.id in " +
        "(select distinct(ah.article_id) from article_has_tag ah where ah.tag_id in" +
        "(select th.tag_id from tag_has_user th where th.user_id = ?1)) order by a.create_time desc", nativeQuery = true)
    List<Article> ArticleListTag(int userId, Pageable pageable);

    @Query(value = "select * from article a where a.user_id in " +
        "(select f.to_id from follow f where f.from_id =?1) order by a.create_time desc", nativeQuery = true)
    List<Article> ArticleListFollow(int userId, Pageable pageable);

    @Query(value = "select * from article a where a.id in " +
        "(select ah.article_id from article_has_tag ah, tag t " +
        "where ah.tag_id = t.id and t.name like %?1%) order by a.create_time desc", nativeQuery = true)
    List<Article> ArticleListTagSearch(String tagName, Pageable pageable);

    List<Article> findAllByUserAndArea(User user, String Area);

    List<Article> findByUser(User userId, Pageable pageable);

    int countArticleByUser(User userId);


}
