package a402.FaST.service;

import a402.FaST.Controller.UserController;
import a402.FaST.model.dto.CommentListResponseDto;
import a402.FaST.model.dto.CommentModifyDto;
import a402.FaST.model.dto.CommentRequestDto;
import a402.FaST.model.dto.CommentResponseDto;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.Comment;
import a402.FaST.model.entity.User;
import a402.FaST.repository.ArticleRepository;
import a402.FaST.repository.CommentRepository;
import a402.FaST.repository.LikesRepository;
import a402.FaST.repository.UserRepository;
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


}
