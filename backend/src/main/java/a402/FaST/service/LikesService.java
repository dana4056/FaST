package a402.FaST.service;


public interface LikesService {
    boolean likeArticle(int articleId, int userId);

    boolean likeComment(int commentId, int userId);

    boolean likeCommentReply(int commentReplyId, int userId);
}