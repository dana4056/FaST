package a402.FaST.service;


import a402.FaST.model.dto.FollowRequestDto;
import a402.FaST.model.dto.FollowSearchRequestDto;
import a402.FaST.model.dto.UserFromFollowResponseDto;
import a402.FaST.model.dto.UserFromToFollowResponseDto;

public interface FollowService {
    boolean insertFollow(FollowRequestDto requestDto);

    boolean deleteFollow(FollowRequestDto requestDto);

    UserFromToFollowResponseDto getfollow(FollowSearchRequestDto requestDto);

    int cntFollower(int toId);
    int cntFollowing(int fromId);

    UserFromFollowResponseDto NotFollow(FollowSearchRequestDto requestDto);
}