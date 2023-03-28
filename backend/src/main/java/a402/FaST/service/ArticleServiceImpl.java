package a402.FaST.service;


import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.model.dto.*;
import a402.FaST.model.entity.*;
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
        ArticleResponseDto responseDto = null;
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

        responseDto = ArticleResponseDto.builder()
                .id(article.getId())
                .imgPath(article.getImgPath())
                .content(article.getContent())
                .createTime(article.getCreateTime())
                .likeCount(likesRepository.countByArticleId(article.getId()))
                .commentCount(commentRepository.countByArticleId(article.getId()))
                .let(article.getLet())
                .lng(article.getLng())
                .userId(requestDto.getUserId())
                .build();

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
        ArticleResponseDto responseDto = null;

        if (article.getUser().getId() != modifyDto.getUserId()){
            throw new Exception("작성자가 아닙니다!");
        }else{
            article.setImgPath(modifyDto.getImgPath());
            article.setContent(modifyDto.getContent());
            article.setLet(modifyDto.getLet());
            article.setLng(modifyDto.getLng());

            articleHasTagRepository.deleteAllByArticleId(modifyDto.getArticleId());
            TagAdd(article, modifyDto.getTags());

            responseDto = ArticleResponseDto.builder()
                    .id(article.getId())
                    .imgPath(article.getImgPath())
                    .content(article.getContent())
                    .createTime(article.getCreateTime())
                    .likeCount(likesRepository.countByArticleId(article.getId()))
                    .commentCount(commentRepository.countByArticleId(article.getId()))
                    .let(article.getLet())
                    .lng(article.getLng())
                    .userId(modifyDto.getUserId())
                    .build();

        }

        return responseDto;
    }

    @Override
    public ArticleDetailResponseDto detail(int id, int userId) {
        ArticleDetailResponseDto responseDto = null;

        Article article = articleRepository.findById(id).get();

        responseDto = ArticleDetailResponseDto.builder()
                .id(article.getId())
                .userId(article.getUser().getId())
                .nickName(article.getUser().getNickname())
                .imgPath(article.getImgPath())
                .content(article.getContent())
                .createTime(article.getCreateTime())
                .likeCount(likesRepository.countByArticleId(id))
                .commentCount(commentRepository.countByArticleId(id))
                .let(article.getLet())
                .lng(article.getLng())
                .likeCheck(likesRepository.existsByIdAndUserId(id,userId))
                .tags(article.getTags().stream()
                        .map((Tag -> TagResponseDto.builder()
                                .tagId(Tag.getTag().getId())
                                .tagName(Tag.getTag().getName())
                                .build()))
                        .collect(Collectors.toList()))
                .build();

        return responseDto;
    }

    @Override
    public int articleCnt(int userId) {
        if(!userRepository.existsById(userId)){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(userId).get();
            return articleRepository.countArticleByUser(user);
        }

    }

    @Override
    public List<ArticleListResponseDto> listArticleTag(int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = null;

        responseDto = articleRepository.ArticleListTag(userId, pageable)
                .stream().map(x->ArticleListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser_Id())
                        .nickName(userRepository.nickName(x.getUser_Id()))
                        .imgPath(x.getImg_path())
                        .createTime(x.getCreate_Time())
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByIdAndUserId(x.getId(),userId))
                        .tags(articleRepository.findById(x.getId()).get().getTags().stream()
                                .map(Tag->TagResponseDto.builder()
                                        .tagId(Tag.getTag().getId())
                                        .tagName(Tag.getTag().getName())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return responseDto;
    }

    @Override
    public List<ArticleListResponseDto> listArticleUser(int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = null;
        User user = userRepository.findById(userId).get();

        responseDto = articleRepository.findByUser(user, pageable)
                .stream().map(x->ArticleListResponseDto.builder()
                        .id(x.getId())
                        .userId(userId)
                        .nickName(userRepository.nickName(userId))
                        .imgPath(x.getImgPath())
                        .createTime(x.getCreateTime())
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByIdAndUserId(x.getId(),userId))
                        .tags(articleRepository.findById(x.getId()).get().getTags().stream()
                                .map(Tag->TagResponseDto.builder()
                                        .tagId(Tag.getTag().getId())
                                        .tagName(Tag.getTag().getName())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return responseDto;
    }

    @Override
    public List<ArticleListResponseDto> listArticleFollow(int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = null;

        responseDto = articleRepository.ArticleListFollow(userId, pageable)
                .stream().map(x->ArticleListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser_Id())
                        .nickName(userRepository.nickName(x.getUser_Id()))
                        .imgPath(x.getImg_path())
                        .createTime(x.getCreate_Time())
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByIdAndUserId(x.getId(),userId))
                        .tags(articleRepository.findById(x.getId()).get().getTags().stream()
                                .map(Tag->TagResponseDto.builder()
                                        .tagId(Tag.getTag().getId())
                                        .tagName(Tag.getTag().getName())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return responseDto;
    }

    @Override
    public List<ArticleListResponseDto> listArticleTagSearch(int userId, int size, int offset, String tagName) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = null;

        responseDto = articleRepository.ArticleListTagSearch(tagName, pageable)
                .stream().map(x->ArticleListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser_Id())
                        .nickName(userRepository.nickName(x.getUser_Id()))
                        .imgPath(x.getImg_path())
                        .createTime(x.getCreate_Time())
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByIdAndUserId(x.getId(),userId))
                        .tags(articleRepository.findById(x.getId()).get().getTags().stream()
                                .map(Tag->TagResponseDto.builder()
                                        .tagId(Tag.getTag().getId())
                                        .tagName(Tag.getTag().getName())
                                        .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return responseDto;
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

}