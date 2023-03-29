package a402.FaST.service;

import a402.FaST.Controller.UserController;
import a402.FaST.model.dto.*;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.Comment;
import a402.FaST.model.entity.CommentReply;
import a402.FaST.model.entity.User;
import a402.FaST.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class CommentReplyServiceImpl implements CommentReplyService{

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final LikesRepository likesRepository;
    private final CommentReplyRepository commentReplyRepository;


    @Override
    public CommentReplyResponseDto create(CommentReplyRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).get();
        Comment comment = commentRepository.findById(requestDto.getCommentId()).get();

        CommentReply commentReply = CommentReply.builder()
                .content(requestDto.getContent())
                .createTime(LocalDateTime.now())
                .user(user)
                .comment(comment)
                .build();

        commentReplyRepository.save(commentReply);

        CommentReplyResponseDto responseDto = CommentReplyResponseDto.builder()
                .id(commentReply.getId())
                .userId(commentReply.getUser().getId())
                .commentId(commentReply.getComment().getId())
                .content(commentReply.getContent())
                .createTime(commentReply.getCreateTime())
                .likeCount(likesRepository.countByCommentReplyId(commentReply.getId()))
                .build();

        return responseDto;
    }

    @Override
    public boolean deleteCommentReply(int id, int userId) throws Exception {
        CommentReply commentReply = commentReplyRepository.findById(id).get();

        if (commentReply.getUser().getId() != userId){
            throw new Exception("작성자가 아닙니다");
        }else{
            commentReplyRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public CommentReplyResponseDto modify(CommentReplyModifyDto modifyDto) throws Exception {
        CommentReply commentReply = commentReplyRepository.findById(modifyDto.getCommentReplyId()).get();
        CommentReplyResponseDto responseDto = null;

        if (commentReply.getUser().getId() != modifyDto.getUserId()){
            throw new Exception("작성자가 아닙니다!");
        }else{
            commentReply.setContent(modifyDto.getContent());
            responseDto = CommentReplyResponseDto.builder()
                    .id(commentReply.getId())
                    .userId(commentReply.getUser().getId())
                    .commentId(commentReply.getComment().getId())
                    .content(commentReply.getContent())
                    .createTime(commentReply.getCreateTime())
                    .likeCount(likesRepository.countByCommentReplyId(commentReply.getId()))
                    .build();
        }

        return responseDto;
    }

    @Override
    public List<CommentReplyListResponseDto> commentReplyList(int commentId, int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<CommentReplyListResponseDto> responseDto = null;

        responseDto = commentReplyRepository.findAllByCommentIdOrderByCreateTime(commentId, pageable)
                .stream().map(x->CommentReplyListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser().getId())
                        .nickName(x.getUser().getNickname())
                        .createTime(x.getCreateTime())
                        .content(x.getContent())
                        .likeCheck(likesRepository.existsByCommentReplyIdAndUserId(x.getId(),userId))
                        .build()).collect(Collectors.toList());

        return responseDto;
    }


}
