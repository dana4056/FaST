package a402.FaST.service;



import a402.FaST.model.dto.ArticleCommentResponseDto;
import a402.FaST.model.dto.ArticleModifyDto;
import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.ArticleResponseDto;

public interface ArticleService {
    ArticleResponseDto create(ArticleRequestDto requestDto);
    boolean deleteArticle(int id, int userId) throws Exception;

    ArticleResponseDto modify(ArticleModifyDto modifyDto) throws Exception;

    ArticleCommentResponseDto detail(int id);
}