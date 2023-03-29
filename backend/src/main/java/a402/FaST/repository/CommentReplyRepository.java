package a402.FaST.repository;

import a402.FaST.model.entity.Comment;
import a402.FaST.model.entity.CommentReply;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentReplyRepository extends JpaRepository<CommentReply, Integer> {

    int countByCommentId(int commentId);

    List<CommentReply> findAllByCommentIdOrderByCreateTime(int commentId, Pageable pageable);
}
