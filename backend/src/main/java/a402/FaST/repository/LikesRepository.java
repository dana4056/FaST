package a402.FaST.repository;


import a402.FaST.model.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Integer> {

    int countByArticleId(int articleId);
//    Likes findByIdAndUserId(int id, int userId);
    boolean existsByIdAndUserId(int id, int userId);
//    int countByArticleId(int articleId);
}
