package a402.FaST.repository;


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

    Page<Article> findAllOrderByCreateTimeDesc(LocalDateTime CreateTime, Pageable pageable);
}
