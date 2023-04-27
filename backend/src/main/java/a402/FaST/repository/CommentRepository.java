package a402.FaST.repository;

import a402.FaST.model.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    int countByArticleId(int articleId);

    List<Comment> findAllByArticleIdOrderByCreateTimeDesc(int article_id, Pageable pageable);
}
