package a402.FaST.service;


import a402.FaST.model.dto.*;
import a402.FaST.model.entity.*;
import a402.FaST.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private static final Logger logger = LoggerFactory.getLogger(ArticleServiceImpl.class);

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final ArticleHasTagRepository articleHasTagRepository;
    private final LikesRepository likesRepository;
    private final CommentRepository commentRepository;


    @Override
    public ArticleResponseDto create(ArticleRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId()).get();

        Article article = Article.builder()
                .imgPath(requestDto.getImgPath())
                .content(requestDto.getContent())
                .createTime(LocalDateTime.now())
                .let(requestDto.getLet())
                .lng(requestDto.getLng())
                .user(user)
                .build();

        articleRepository.save(article);
        TagAdd(article, requestDto.getTags());

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

    @Override
    public ArticleResponseDto modify(ArticleModifyDto modifyDto) throws Exception {
        Article article = articleRepository.findById(modifyDto.getArticleId()).get();
        ArticleResponseDto responseDto;

        if (article.getUser().getId() != modifyDto.getUserId()){
            throw new Exception("작성자가 아닙니다!");
        }else{
            article.setImgPath(modifyDto.getImgPath());
            article.setContent(modifyDto.getContent());
            article.setLet(modifyDto.getLet());
            article.setLng(modifyDto.getLng());

            articleHasTagRepository.deleteAllByArticleId(modifyDto.getArticleId());
            TagAdd(article, modifyDto.getTags());
            responseDto = ArticleResponseDto.from(article);
        }

        return responseDto;
    }

    @Override
    public ArticleCommentResponseDto detail(int id, int userId) {
        ArticleCommentResponseDto responseDto = null;

        Article article = articleRepository.findById(id).get();
        article.setLikeCount(likesRepository.countByArticleId(id));
        article.setCommentCount(commentRepository.countByArticleId(id));
        responseDto = ArticleCommentResponseDto.from(article);

        Boolean check = likesRepository.existsByIdAndUserId(id,userId);
        if (check){
            responseDto.setLikeCheck(true);
        }

        return responseDto;
    }

    @Override
    public Page<ArticleListResponseDto> listArticle(Pageable pageable) {
//        Page<ArticleListResponseDto> myEntities = articleRepository.findAll(pageable);
//        return myEntities.map(this::mapToDTO);
        logger.info(" 여기까지옴");
        logger.info(" data {}",articleRepository.findAll(pageable));
        LocalDateTime createTime = LocalDateTime.now();
        return articleRepository.findAllOrderByCreateTimeDesc(createTime,pageable)
                .map(ArticleListResponseDto::new);
    }

    //    -----------------------------------------------------------------------------------
    private void TagAdd(Article article, List<String> tags) {
        for (String tagName : tags) {
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
    }

//    public ArticleListResponseDto mapToDTO(ArticleListResponseDto myEntity) {
//        ArticleListResponseDto myDTO = new ArticleListResponseDto();
//        myDTO.setImgPath(myEntity.getImgPath());
//            return myDTO;
//    }
}