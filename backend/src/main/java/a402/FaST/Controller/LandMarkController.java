package a402.FaST.Controller;

import a402.FaST.model.dto.LandMarkResponseDto;
import a402.FaST.service.LandMarkServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/landmark")
@Api(tags = "LandMark Controller")
public class LandMarkController {

    private static final Logger logger = LoggerFactory.getLogger(LandMarkController.class);

    private final LandMarkServiceImpl landMarkService;

    @GetMapping("/{userId}")
    @Operation(summary = "사용자 랜드마크 조회 API =>  사용자가 랜드마크깨기에 성공한 랜드마크 정보 돌려주는 API 입니다.",
            description = "PathVariable 형식 데이터 -> (int : userId)" +
                    " => 사용자가 랜드마크깨기에 성공한 랜드마크 정보 제공")
    public List<LandMarkResponseDto> findLandMark (@Valid @PathVariable int userId)  {
        return landMarkService.findLandMark(userId);
    }


}
