package a402.FaST.service;

import a402.FaST.Controller.UserController;
import a402.FaST.model.dto.*;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.Comment;
import a402.FaST.model.entity.User;
import a402.FaST.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final LikesRepository likesRepository;
    private final CommentReplyRepository commentReplyRepository;


    @Override
    public CommentResponseDto create(CommentRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).get();
        Article article = articleRepository.findById(requestDto.getArticleId()).get();

        Comment comment = Comment.builder()
                .content(requestDto.getContent())
                .createTime(LocalDateTime.now())
                .user(user)
                .article(article)
                .build();

        commentRepository.save(comment);
        CommentResponseDto responseDto = CommentResponseDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .articleId(comment.getArticle().getId())
                .content(comment.getContent())
                .createTime(comment.getCreateTime())
                .likeCount(likesRepository.countByCommentId(comment.getId()))
                .commentReplyCount(commentReplyRepository.countByCommentId(comment.getId()))
                .build();

        return responseDto;
    }

    @Override
    public boolean deleteComment(int id, int userId) throws Exception {
        Comment comment = commentRepository.findById(id).get();
        if (comment.getUser().getId() != userId){
            throw new Exception("작성자가 아닙니다");
        }else{
            commentRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public CommentResponseDto modify(CommentModifyDto modifyDto) throws Exception {
        Comment comment = commentRepository.findById(modifyDto.getCommentId()).get();
        CommentResponseDto responseDto;

        if (comment.getUser().getId() != modifyDto.getUserId()){
            throw new Exception("작성자가 아닙니다!");
        }else{
            comment.setContent(modifyDto.getContent());
            responseDto = CommentResponseDto.builder()
                    .id(comment.getId())
                    .userId(comment.getUser().getId())
                    .articleId(comment.getArticle().getId())
                    .content(comment.getContent())
                    .createTime(comment.getCreateTime())
                    .likeCount(likesRepository.countByCommentId(comment.getId()))
                    .commentReplyCount(commentReplyRepository.countByCommentId(comment.getId()))
                    .build();
        }
        return responseDto;

    }

    @Override
    public List<CommentListResponseDto> commentList(int articleId, int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<CommentListResponseDto> responseDto = null;

        responseDto = commentRepository.findAllByArticleIdOrderByCreateTime(articleId,pageable)
                .stream().map(x-> CommentListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser().getId())
                        .nickName(x.getUser().getNickname())
                        .imgPath(x.getUser().getImgPath())
                        .createTime(x.getCreateTime())
                        .content(x.getContent())
                        .likeCount(likesRepository.countByCommentId(x.getId()))
                        .likeCheck(likesRepository.existsByCommentIdAndUserId(x.getId(),userId))
                        .commentReplyCount(commentReplyRepository.countByCommentId(x.getId()))
                        .build()).collect(Collectors.toList());

        return responseDto;
    }
}
