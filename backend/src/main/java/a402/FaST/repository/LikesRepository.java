package a402.FaST.repository;


import a402.FaST.model.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Integer> {

    int countByArticleId(int articleId);
    int countByCommentId(int commentId);
//    int countByArticleId(int articleId);
}
