package a402.FaST.service;

import a402.FaST.model.entity.Likes;
import a402.FaST.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class LikesServiceImpl implements LikesService {

    private final LikesRepository likesRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CommentReplyRepository commentReplyRepository;


    @Override
    public int likeArticle(int articleId, int userId) {
        if (likesRepository.existsByArticleIdAndUserId(articleId, userId)){
            likesRepository.deleteByArticleIdAndUserId(articleId, userId);
            return likesRepository.countByArticleId(articleId);
        }else{
            Likes likes = Likes.builder()
                    .article(articleRepository.findById(articleId).get())
                    .user(userRepository.findById(userId).get())
                    .build();
            likesRepository.save(likes);
            return likesRepository.countByArticleId(articleId);
        }

    }

    @Override
    public int likeComment(int commentId, int userId) {
        if (likesRepository.existsByCommentIdAndUserId(commentId, userId)){
            likesRepository.deleteByCommentIdAndUserId(commentId, userId);
            return likesRepository.countByCommentId(commentId);
        }else{
            Likes likes = Likes.builder()
                    .comment(commentRepository.findById(commentId).get())
                    .user(userRepository.findById(userId).get())
                    .build();
            likesRepository.save(likes);
            return likesRepository.countByCommentId(commentId);
        }
    }

    @Override
    public int likeCommentReply(int commentReplyId, int userId) {
        if (likesRepository.existsByCommentReplyIdAndUserId(commentReplyId, userId)){
            likesRepository.deleteByCommentReplyIdAndUserId(commentReplyId, userId);
            return likesRepository.countByCommentReplyId(commentReplyId);
        }else{
            Likes likes = Likes.builder()
                    .commentReply(commentReplyRepository.findById(commentReplyId).get())
                    .user(userRepository.findById(userId).get())
                    .build();
            likesRepository.save(likes);
            return likesRepository.countByCommentReplyId(commentReplyId);
        }
    }
}
