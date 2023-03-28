package a402.FaST.service;


import a402.FaST.model.dto.CommentListResponseDto;
import a402.FaST.model.dto.CommentModifyDto;
import a402.FaST.model.dto.CommentRequestDto;
import a402.FaST.model.dto.CommentResponseDto;

import java.util.List;

public interface CommentService {
    CommentResponseDto create(CommentRequestDto requestDto);

    boolean deleteComment(int id, int userId) throws Exception;

    CommentResponseDto modify(CommentModifyDto modifyDto) throws Exception;

    List<CommentListResponseDto> commentList(int articleId, int size, int offset);
}
