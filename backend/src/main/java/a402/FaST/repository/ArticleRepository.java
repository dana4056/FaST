package a402.FaST.repository;


import a402.FaST.model.dto.ArticleList;
import a402.FaST.model.dto.ArticleListDto;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {


    @Query(value = "select a.id, a.img_path, a.create_time, a.like_count from article a where a.id in " +
            "(select distinct(ah.article_id) from article_has_tag ah where ah.tag_id in" +
            "(select th.tag_id from tag_has_user th where th.user_id = ?1)) ", nativeQuery = true)
    List<ArticleList> ArticleList1(int userId, Pageable pageable);


}
