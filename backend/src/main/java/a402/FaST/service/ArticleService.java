package a402.FaST.service;



import a402.FaST.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {
    ArticleResponseDto create(ArticleRequestDto requestDto);
    boolean deleteArticle(int id, int userId) throws Exception;

    ArticleResponseDto modify(ArticleModifyDto modifyDto) throws Exception;

    ArticleCommentResponseDto detail(int id, int userId);

    Page<ArticleListResponseDto> listArticle(Pageable pageable);
}