package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.service.FollowServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@Api(tags = "Follow Controller")
public class FollowController {

    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);
    private final FollowServiceImpl followService;

    @PostMapping("")
    @Operation(summary = "팔로우 추가 API =>  유저 ID(fromId)와 팔로잉할 ID(toId)를 입력받아 팔로우 추가하는 API 입니다.",
            description = "<b>[json 형식 데이터]</b><br>{ int : fromId, int : toId }<br><br> " +
            " => True or error return")
    public ResponseEntity insertFollow(@Valid @RequestBody FollowRequestDto requestDto) {
        boolean check = followService.insertFollow(requestDto);
        return ResponseEntity.ok(check);
    }

    @DeleteMapping("")
    @Operation(summary = "팔로우 삭제 API",
            description = "<b>[json 형식 데이터]</b><br>{ int : fromId, int : toId}<br><br>" +
                    " => 검증 결과에 따라 True or error Return")
    public ResponseEntity deleteFollow(@Valid @RequestBody FollowRequestDto requestDto)  {
        boolean check = followService.deleteFollow(requestDto);
        return ResponseEntity.ok(check);
    }

    @GetMapping("/search")
    @Operation(summary = "팔로우 조회 API =>  유저 ID로 해당 유저의 Follower, Following 유저 검색",
            description = "<b>[RequestParam 형식 데이터]</b><br>- int : userId (기준 유저 id)<br><br>" +
                    " => UserFollowResponseDto Return")
    public ResponseEntity<UserFromToFollowResponseDto> findUser(@Valid @RequestParam("userId") int userId) throws Exception {
        UserFromToFollowResponseDto userFromToFollowResponseDto = null;
        userFromToFollowResponseDto = followService.getfollow(userId);
        return ResponseEntity.ok(userFromToFollowResponseDto);
    }

    @GetMapping("/to")
    @Operation(summary = "팔로워 조회 API =>  필로워 수 조회하는 API 입니다.",
            description = "RequestParam 형식 데이터 -> (int : toId)" +
                    " => 팔로워 수를 Return 해줍니다.")
    public ResponseEntity cntFollower(@Valid @RequestParam int toId)  {
        int cnt = followService.cntFollower(toId);
        return ResponseEntity.ok(cnt);
    }

    @GetMapping("/from")
    @Operation(summary = "팔로잉 조회 API =>  필로잉 수 조회하는 API 입니다.",
            description = "RequestParam 형식 데이터 -> (int : fromId)" +
                    " => 팔로잉 수를 Return 해줍니다.")
    public ResponseEntity cntFollowing(@Valid @RequestParam int fromId)  {
        int cnt = followService.cntFollowing(fromId);
        return ResponseEntity.ok(cnt);
    }

    @GetMapping("/not-follow")
    @Operation(summary = "NOT 팔로워 조회 API =>  유저 ID로 해당 유저를 팔로워 하지 않는 유저 정보를 조회",
            description = "<b>[RequestParam 형식 데이터]</b><br>- int : userId (기준 유저 id)<br><br>" +
                    " => UserFromFollowResponseDto Return")
    public ResponseEntity<List<UserNotFollowResponseDto>> NotFollow(@Valid @RequestParam("userId") int userId) throws Exception {
        List<UserNotFollowResponseDto> userNotFollowResponseDtoList = null;
        userNotFollowResponseDtoList = followService.NotFollow(userId);
        return ResponseEntity.ok(userNotFollowResponseDtoList);
    }

}
