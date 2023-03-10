package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.model.entity.Tag;
import a402.FaST.service.TagServiceImpl;
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
@RequestMapping("/tag")
@Api(tags = "Tag Controller")
public class TagController {

    private static final Logger logger = LoggerFactory.getLogger(TagController.class);

    private final TagServiceImpl tagService;

    @PostMapping("")
    @Operation(summary = "태그 추가 API => 사용자 정보와 태그 리스트를 받아 사용자 태그로 저장하는 API 입니다.",
            description = "json 형식 데이터 -> (List : [name : String] String : email) " +
            " => 태그를 가지고 있는 사용자 정보를 Return 해줍니다.")
    public ResponseEntity<UserResponseDto> insertTag( @RequestBody TagRequestDto requestDto) {
        UserResponseDto responseDto = null;

        List<String> list =  requestDto.getTags();
        int id = requestDto.getId();
        logger.info("id = {}",id);
        logger.info("list = {}",list);

        responseDto = tagService.insertTag(requestDto);

        return ResponseEntity.ok(responseDto);
    }


}
