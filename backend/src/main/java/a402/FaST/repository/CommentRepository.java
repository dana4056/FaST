package a402.FaST.repository;


import a402.FaST.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    int countByArticleId(int articleId);
}
