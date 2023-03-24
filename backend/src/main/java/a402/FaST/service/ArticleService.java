package a402.FaST.service;



import a402.FaST.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleService {
    ArticleResponseDto create(ArticleRequestDto requestDto);
    boolean deleteArticle(int id, int userId) throws Exception;

    ArticleResponseDto modify(ArticleModifyDto modifyDto) throws Exception;

    ArticleCommentResponseDto detail(int id, int userId);

    List<ArticleListResponseDto> listArticle(int userId, int size, int offset);
}