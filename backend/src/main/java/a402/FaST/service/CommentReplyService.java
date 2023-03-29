package a402.FaST.service;


import a402.FaST.model.dto.CommentReplyListResponseDto;
import a402.FaST.model.dto.CommentReplyModifyDto;
import a402.FaST.model.dto.CommentReplyRequestDto;
import a402.FaST.model.dto.CommentReplyResponseDto;

import java.util.List;

public interface CommentReplyService {
    CommentReplyResponseDto create(CommentReplyRequestDto requestDto);

    boolean deleteCommentReply(int id, int userId) throws Exception;

    CommentReplyResponseDto modify(CommentReplyModifyDto modifyDto) throws Exception;

    List<CommentReplyListResponseDto> commentReplyList(int commentId, int userId, int size, int offset);
}
