package a402.FaST.service;


import a402.FaST.model.dto.FollowRequestDto;
import a402.FaST.model.dto.FollowSearchRequestDto;
import a402.FaST.model.dto.UserNotFollowResponseDto;
import a402.FaST.model.dto.UserFromToFollowResponseDto;

import java.util.List;

public interface FollowService {
    boolean insertFollow(FollowRequestDto requestDto);

    boolean deleteFollow(FollowRequestDto requestDto);

    UserFromToFollowResponseDto getfollow(FollowSearchRequestDto requestDto);

    int cntFollower(int toId);
    int cntFollowing(int fromId);

    List<UserNotFollowResponseDto> NotFollow(FollowSearchRequestDto requestDto);
}