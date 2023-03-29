package a402.FaST.repository;


import a402.FaST.model.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Integer> {

    int countByArticleId(int articleId);
    int countByCommentId(int commentId);
    int countByCommentReplyId(int commentReplyId);
    boolean existsByArticleIdAndUserId(int articleId, int userId);
    boolean existsByCommentIdAndUserId(int commentId, int userId);
    boolean existsByCommentReplyIdAndUserId(int commentReplyId, int userId);

    void deleteByArticleIdAndUserId(int articleId, int userId);
    void deleteByCommentIdAndUserId(int commentId, int userId);
    void deleteByCommentReplyIdAndUserId(int commentReplyId, int userId);
}
