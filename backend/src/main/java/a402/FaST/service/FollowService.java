package a402.FaST.service;


import a402.FaST.model.dto.FollowRequestDto;
import a402.FaST.model.dto.FollowSearchRequestDto;
import a402.FaST.model.dto.UserFollowResponseDto;

public interface FollowService {
    boolean insertFollow(FollowRequestDto requestDto);

    boolean deleteFollow(FollowRequestDto requestDto);

    UserFollowResponseDto getfollow(FollowSearchRequestDto requestDto);

    int cntFollower(int toId);
    int cntFollowing(int fromId);

    UserFollowResponseDto getfollow2(FollowSearchRequestDto requestDto);
}