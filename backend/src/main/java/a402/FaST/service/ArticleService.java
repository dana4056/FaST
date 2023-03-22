package a402.FaST.service;



import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.ArticleResponseDto;

public interface ArticleService {
    ArticleResponseDto create(ArticleRequestDto requestDto);
    boolean deleteArticle(int id, int userId) throws Exception;
}