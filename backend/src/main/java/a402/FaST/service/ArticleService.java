package a402.FaST.service;


import a402.FaST.model.dto.ArticleCommentResponseDto;
import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.UserRequestDto;

public interface ArticleService {
    ArticleCommentResponseDto create(ArticleRequestDto requestDto);
}