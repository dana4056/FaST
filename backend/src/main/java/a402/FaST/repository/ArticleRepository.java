package a402.FaST.repository;


import a402.FaST.model.dto.ArticleList;
import a402.FaST.model.dto.ArticleListResponseDto;
import a402.FaST.model.dto.NotFollowList;
import a402.FaST.model.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

//    Page<Article> findAllOrderByCreateTimeDesc(LocalDateTime CreateTime, Pageable pageable);

    @Query(value = "select a.id, a.img_path, a.create_time " +
            "from Article a where id in (" +
            "select distinct(ah.article_id) from article_has_tag ah where ah.tag_id in(" +
            "select tag_id from tag_has_user th where th.user_id = ?1))", nativeQuery = true)
    Page<ArticleList> ArticleList(int userId, Pageable pageable);


}
