package a402.FaST.service;


import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.model.dto.*;
import a402.FaST.model.entity.*;
import a402.FaST.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
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
    private final UserHasLandMarkRepository userHasLandMarkRepository;
    private final LandMarkRepository landMarkRepository;


    @Override
    public ArticleResponseDto create(ArticleRequestDto requestDto) {

        User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new NoSuchElementException("없는 사용자 입니다."));

        ArticleResponseDto responseDto = null;

        Article article = Article.builder()
                .imgPath(requestDto.getImgPath())
                .content(requestDto.getContent())
                .createTime(LocalDateTime.now())
                .lat(requestDto.getLat())
                .lng(requestDto.getLng())
                .area(requestDto.getArea())
                .user(user)
                .build();

        articleRepository.save(article);
        TagAdd(article, requestDto.getTags());
        autoTagAdd(article, user.getId(), requestDto.getAutoTags());

        responseDto = ArticleResponseDto.builder()
                .id(article.getId())
                .imgPath(article.getImgPath())
                .content(article.getContent())
                .createTime(article.getCreateTime())
                .commentCount(commentRepository.countByArticleId(article.getId()))
                .likeCount(likesRepository.countByArticleId(article.getId()))
                .lat(article.getLat())
                .lng(article.getLng())
                .area(article.getArea())
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
            article.setLat(modifyDto.getLat());
            article.setLng(modifyDto.getLng());
            article.setArea(modifyDto.getArea());

            articleHasTagRepository.deleteAllByArticleId(modifyDto.getArticleId());
            TagAdd(article, modifyDto.getTags());

            responseDto = ArticleResponseDto.builder()
                    .id(article.getId())
                    .imgPath(article.getImgPath())
                    .content(article.getContent())
                    .createTime(article.getCreateTime())
                    .commentCount(commentRepository.countByArticleId(article.getId()))
                    .likeCount(likesRepository.countByArticleId(article.getId()))
                    .lat(article.getLat())
                    .lng(article.getLng())
                    .area(article.getArea())
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
                .lat(article.getLat())
                .lng(article.getLng())
                .area(article.getArea())
                .commentCount(commentRepository.countByArticleId(id))
                .likeCount(likesRepository.countByArticleId(id))
                .likeCheck(likesRepository.existsByArticleIdAndUserId(id,userId))
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
    public List<ArticleListResponseDto> listArticleUserTag(int userId, int size, int offset) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = null;

        responseDto = articleRepository.ArticleListTag(userId, pageable)
                .stream().map(x->ArticleListResponseDto.builder()
                        .id(x.getId())
                        .userId(x.getUser().getId())
                        .nickName(userRepository.nickName(x.getUser().getId()))
                        .imgPath(x.getImgPath())
                        .createTime(x.getCreateTime())
                        .area(x.getArea())
                        .lat(x.getLat())
                        .lng(x.getLng())
                        .commentCount(commentRepository.countByArticleId(x.getId()))
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByArticleIdAndUserId(x.getId(),userId))
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
                        .userId(x.getUser().getId())
                        .nickName(userRepository.nickName(x.getUser().getId()))
                        .imgPath(x.getImgPath())
                        .createTime(x.getCreateTime())
                        .area(x.getArea())
                        .lat(x.getLat())
                        .lng(x.getLng())
                        .commentCount(commentRepository.countByArticleId(x.getId()))
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByArticleIdAndUserId(x.getId(),userId))
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
                        .userId(x.getUser().getId())
                        .nickName(userRepository.nickName(x.getUser().getId()))
                        .imgPath(x.getImgPath())
                        .createTime(x.getCreateTime())
                        .area(x.getArea())
                        .lat(x.getLat())
                        .lng(x.getLng())
                        .commentCount(commentRepository.countByArticleId(x.getId()))
                        .likeCount(likesRepository.countByArticleId(x.getId()))
                        .likeCheck(likesRepository.existsByArticleIdAndUserId(x.getId(),userId))
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
    public List<ArticleListResponseDto> listArticleArea(int userId, int size, int offset, String area) {
        List<ArticleListResponseDto> responseDto = null;
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("해당 유저가 없습니다."));

        Pageable pageable = PageRequest.of(offset, size);

        responseDto = articleRepository.findAllByUserAndArea(user, area, pageable)
            .stream().map(x->ArticleListResponseDto.builder()
                .id(x.getId())
                .userId(userId)
                .nickName(userRepository.nickName(userId))
                .imgPath(x.getImgPath())
                .createTime(x.getCreateTime())
                .area(x.getArea())
                .lat(x.getLat())
                .lng(x.getLng())
                .commentCount(commentRepository.countByArticleId(x.getId()))
                .likeCount(likesRepository.countByArticleId(x.getId()))
                .likeCheck(likesRepository.existsByArticleIdAndUserId(x.getId(),userId))
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
    public List<ArticleListResponseDto> listArticleSearchTagAll(int userId, int size, int offset, List<String> tags) {
        Pageable pageable = PageRequest.of(offset, size);
        List<ArticleListResponseDto> responseDto = new ArrayList<>();
        Set<Integer> articleIds = new HashSet<>();

        for (String tagName : tags){
            List<Integer> articles = articleRepository.ArticleListTagSearchAll(tagName, pageable);
            for (int id : articles){
                articleIds.add(id);
            }
        }


        for (int id : articleIds){
            Article article = articleRepository.findById(id).get();
            ArticleListResponseDto articleListResponseDto = ArticleListResponseDto.builder()
                    .id(article.getId())
                    .userId(article.getUser().getId())
                    .nickName(article.getUser().getNickname())
                    .imgPath(article.getUser().getImgPath())
                    .createTime(article.getCreateTime())
                    .commentCount(commentRepository.countByArticleId(article.getId()))
                    .likeCount(likesRepository.countByArticleId(article.getId()))
                    .likeCheck(likesRepository.existsByArticleIdAndUserId(article.getId(),article.getUser().getId()))
                    .tags(articleRepository.findById(article.getId()).get().getTags().stream()
                            .map(Tag->TagResponseDto.builder()
                                    .tagId(Tag.getTag().getId())
                                    .tagName(Tag.getTag().getName())
                                    .build()).collect(Collectors.toList()))
                    .build();
            responseDto.add(articleListResponseDto);
        }

        return responseDto;
    }


    //    -----------------------------------------------------------------------------------
    private void TagAdd(Article article, List<String> tags) {
        if (tags.size() == 1 && tags.get(0).equals("")) {
            return;
        }

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

    private void autoTagAdd(Article article, int userId, List<String> tags) {
        if (tags.size() == 1 && tags.get(0).equals("")) {
            return;
        }

        for (String tagName : tags) {
            if (!tagRepository.existsByName(tagName)) {
                Tag tag = Tag.builder().name(tagName).build();
                tagRepository.save(tag);
            }
            Tag tag = tagRepository.findByName(tagName).get();
            ArticleHasTag articleHasTag = ArticleHasTag.builder()
                    .article(article)
                    .tag(tag)
                    .build();
            articleHasTagRepository.save(articleHasTag);

            if (!userHasLandMarkRepository.existsByUserIdAndLandMarkName(userId,tagName) && landMarkRepository.existsById(tagName)){
                UserHasLandMark userHasLandMark = UserHasLandMark.builder()
                        .user(userRepository.findById(userId).get())
                        .landMark(landMarkRepository.findById(tagName).get())
                        .build();

                userHasLandMarkRepository.save(userHasLandMark);
            }
        }
    }

}