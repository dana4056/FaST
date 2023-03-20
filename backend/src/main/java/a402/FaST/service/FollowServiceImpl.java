package a402.FaST.service;

import a402.FaST.exception.DuplicateMemberException;
import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.model.PK.FollowPK;
import a402.FaST.model.dto.FollowRequestDto;
import a402.FaST.model.dto.FollowSearchRequestDto;
import a402.FaST.model.dto.UserFollowResponseDto;
import a402.FaST.model.dto.UserResponseDto;
import a402.FaST.model.entity.Follow;
import a402.FaST.model.entity.User;
import a402.FaST.repository.FollowRepository;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    public boolean insertFollow(FollowRequestDto requestDto) {
        User from = userRepository.findById(requestDto.getFromId()).get();
        User to = userRepository.findById(requestDto.getToId()).get();
        if (!followRepository.existsByFromIdAndToId(from, to)){
            Follow follow = Follow.builder()
                    .fromId(from)
                    .toId(to)
                    .build();
            followRepository.save(follow);
            return true;
        }else{
            throw new DuplicateMemberException("이미 팔로우 추가한 계정이거나 없는 계정입니다");
        }
    }

    @Override
    public boolean deleteFollow(FollowRequestDto requestDto) {
        User from = userRepository.findById(requestDto.getFromId()).get();
        User to = userRepository.findById(requestDto.getToId()).get();
        if (followRepository.existsByFromIdAndToId(from, to)){
            followRepository.FollowDelete(from, to);
        }else{
            throw new NotFoundMemberException("없는 팔로우 내용입니다.");
        }
        return true;
    }

    @Override
    public UserFollowResponseDto getfollow(FollowSearchRequestDto requestDto) {
        if(!userRepository.existsById(requestDto.getId())){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(requestDto.getId()).get();
            UserFollowResponseDto userFollowResponseDto = null;
            userFollowResponseDto = UserFollowResponseDto.from(user);
            return userFollowResponseDto;
        }
    }

    @Override
    public int cntFollower(int toId) {
        if(!userRepository.existsById(toId)) {
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(toId).get();
            int cnt = followRepository.countByToId(user);
            return cnt;
        }
    }

    @Override
    public int cntFollowing(int fromId) {
        if(!userRepository.existsById(fromId)) {
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            User user = userRepository.findById(fromId).get();
            int cnt = followRepository.countByFromId(user);
            return cnt;
        }
    }

    @Override
    public UserFollowResponseDto getfollow2(FollowSearchRequestDto requestDto) {
        return null;
    }

//    @Override
//    public UserFollowResponseDto getfollow2(FollowSearchRequestDto requestDto) {
//        if(!userRepository.existsById(requestDto.getId())){
//            throw new NotFoundMemberException("없는 유저입니다.");
//        }else{
////            User user = userRepository.findByToIdNotContaining(requestDto.getId()).get();
////            User user = userRepository.findByToIdNotContaining(requestDto.getId()).get();
////            UserFollowResponseDto userFollowResponseDto = null;
////            userFollowResponseDto = UserFollowResponseDto.from(user);
//            return userFollowResponseDto;
//        }
//    }
}
