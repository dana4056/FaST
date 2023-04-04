package a402.FaST.service;



import a402.FaST.model.dto.*;

import java.util.List;

public interface ArticleService {
    ArticleResponseDto create(ArticleRequestDto requestDto);
    boolean deleteArticle(int id, int userId) throws Exception;

    ArticleResponseDto modify(ArticleModifyDto modifyDto) throws Exception;

    ArticleDetailResponseDto detail(int id, int userId);

    List<ArticleListResponseDto> listArticleUserTag(int userId, int size, int offset);
    List<ArticleListResponseDto> listArticleUser(int userId, int size, int offset);
    List<ArticleListResponseDto> listArticleFollow(int userId, int size, int offset);

    int articleCnt(int userId);

	List<ArticleListResponseDto> listArticleArea(int userId, int size, int offset, String area);

    List<ArticleListResponseDto> listArticleSearchTagAll(int userId, int size, int offset, List<String> tags);

    List<ArticleAreaCntDto> numArticleArea(int userId);
}