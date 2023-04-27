package a402.FaST.service;

import a402.FaST.model.dto.LandMarkResponseDto;
import a402.FaST.repository.LandMarkRepository;
import a402.FaST.repository.UserHasLandMarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class LandMarkServiceImpl implements LandMarkService {

    private final LandMarkRepository landMarkRepository;
    private final UserHasLandMarkRepository userHasLandMarkRepository;

    @Override
    public List<LandMarkResponseDto> findLandMark(int userId) {
        List<LandMarkResponseDto> responseDto = null;

        responseDto = userHasLandMarkRepository.findAllByUserId(userId)
                .stream().map(x->LandMarkResponseDto.builder()
                        .landMarkName(x.getLandMark().getName())
                        .build())
                .collect(Collectors.toList());

        return responseDto;
    }
}
//responseDto = commentRepository.findAllByArticleIdOrderByCreateTime(articleId,pageable)
//        .stream().map(x-> CommentListResponseDto.builder()
//        .id(x.getId())
//        .userId(x.getUser().getId())
//        .nickName(x.getUser().getNickname())
//        .createTime(x.getCreateTime())
//        .content(x.getContent())
//        .likeCheck(likesRepository.existsByCommentIdAndUserId(x.getId(),userId))
//        .commentReplyCount(commentReplyRepository.countByCommentId(x.getId()))
//        .build()).collect(Collectors.toList());