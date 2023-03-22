package a402.FaST.service;


import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.ArticleResponseDto;
import a402.FaST.model.entity.*;
import a402.FaST.repository.ArticleHasTagRepository;
import a402.FaST.repository.ArticleRepository;
import a402.FaST.repository.TagRepository;
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
    private final TagRepository tagRepository;
    private final ArticleHasTagRepository articleHasTagRepository;


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

        for (String tagName : requestDto.getTags()) {
            if (!tagRepository.existsByName(tagName)) {
                Tag tag = Tag.builder().name(tagName).build();
                logger.info(" Tag : {}", tag.getName());
                tagRepository.save(tag);
            }
            Tag tag = tagRepository.findByName(tagName).get();
            ArticleHasTag articleHasTag = ArticleHasTag.builder()
                    .article(article)
                    .tag(tag)
                    .build();
            articleHasTagRepository.save(articleHasTag);
        }

        articleRepository.save(article);
        ArticleResponseDto responseDto = ArticleResponseDto.from(article);
        return responseDto;
    }

    @Override
    public boolean deleteArticle(int id, int userId) throws Exception {
        Article article = articleRepository.findById(id).get();
        if (article.getUser().getId() != userId){
            throw new Exception("작성자가 아닙니다");
        }else{
            articleRepository.deleteById(id);
            return true;
        }

    }
}
