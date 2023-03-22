package a402.FaST.service;


import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.ArticleResponseDto;
import a402.FaST.model.entity.Article;
import a402.FaST.model.entity.User;
import a402.FaST.repository.ArticleRepository;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private static final Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Override
    public ArticleResponseDto create(ArticleRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).get();

        Article article = Article.builder()
                .img_path(requestDto.getImg_path())
                .content(requestDto.getContent())
                .createTime(LocalDateTime.now())
                .let(requestDto.getLet())
                .lng(requestDto.getLng())
                .user(user)
                .build();

        articleRepository.save(article);
        ArticleResponseDto responseDto = ArticleResponseDto.from(article);
        return responseDto;
    }
}
