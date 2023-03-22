package a402.FaST.service;

import a402.FaST.model.dto.ArticleCommentResponseDto;
import a402.FaST.model.dto.ArticleRequestDto;
import a402.FaST.model.dto.UserRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    @Override
    public ArticleCommentResponseDto create(ArticleRequestDto requestDto) {
        return null;
    }
}
