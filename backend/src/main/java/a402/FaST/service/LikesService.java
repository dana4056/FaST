package a402.FaST.service;


public interface LikesService {
    int likeArticle(int articleId, int userId);

    int likeComment(int commentId, int userId);

    int likeCommentReply(int commentReplyId, int userId);
}