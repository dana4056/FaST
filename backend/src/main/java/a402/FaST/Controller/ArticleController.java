package a402.FaST.Controller;

import a402.FaST.model.dto.*;
import a402.FaST.service.ArticleServiceImpl;
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
@RequestMapping("/article")
@Api(tags = "Article Controller")
public class ArticleController {

    private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);
    private final ArticleServiceImpl articleService;

    @PostMapping
    @Operation(summary = "게시글 생성 API",
            description = "json 형식 데이터 -> (int : userId, String : img_path, String : content, String : let, String : lng, String : area, " +
                    "List<String> : tags, List<String> : autoTags)" +
                    " => 검증 결과에 따라 ArticleResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<ArticleResponseDto> create(@Valid @RequestBody ArticleRequestDto requestDto) {
        ArticleResponseDto responseDto = null;
        responseDto = articleService.create(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("{id}/{userId}")
    @Operation(summary = "게시글 삭제 API",
            description = "PathVariable 형식 데이터 (int : id, int : userId)" +
                    " => 검증 결과에 따라 True or error 를 Return 해줍니다.")
    public ResponseEntity delete(@Valid @PathVariable("id") int id, @PathVariable("userId") int userId) throws Exception {
        boolean check = articleService.deleteArticle(id,userId);
        return ResponseEntity.ok(check);
    }

    @PutMapping("/modify-article")
    @Operation(summary = "게시글 수정 API",
            description = "json 형식 데이터 -> (int : userId, int : articleId, String : img_path, String : content, String : let, String : lng, List<String> : tags)" +
                    " => 검증 결과에 따라 ArticleResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<ArticleResponseDto> modifyArticle(@Valid @RequestBody ArticleModifyDto modifyDto) throws Exception {
        ArticleResponseDto responseDto = null;
        responseDto = articleService.modify(modifyDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "게시글 개수 조회 API =>  특정 사용자가 작성한 게시글 개수 조회",
            description = "PathVariable 형식 데이터 (int : userId)" +
                    " => 검증 결과에 따라 게시글 수 or error 를 Return 해줍니다.")
    public int articleCnt (@Valid @PathVariable("userId") int userId) throws Exception {
        return articleService.articleCnt(userId);
    }

    @GetMapping("{id}/{userId}")
    @Operation(summary = "게시글 상세 조회 API",
            description = "PathVariable 형식 데이터 (int : id, int : userId)" +
                    " => 검증 결과에 따라 ArticleDetailResponseDto or error 를 Return 해줍니다.")
    public ResponseEntity<ArticleDetailResponseDto> detail (@Valid @PathVariable("id") int id, @PathVariable("userId") int userId) throws Exception {
        ArticleDetailResponseDto responseDto = null;
        responseDto = articleService.detail(id, userId);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/user/{userId}/{loginId}/{size}/{offset}")
    @Operation(summary = "게시글 목록 조회 (사용자 작성 기반) API ",
            description = "<b>[PathVariable 형식 데이터]</b><br>- int : userId (게시물 검색할 유저)<br>- int : loginId (현재 로그인한 유저 id)<br>- int : size(받을 데이터 개수)<br>- int : offset(이에 따른 페이지 번호)<br><br>" +
                    " => ArticleListResponseDto return ")
    public List<ArticleListResponseDto> articleListUser (@Valid @PathVariable("userId") int userId, @PathVariable("loginId") int loginId, @PathVariable("size") int size, @PathVariable("offset") int offset) {
        return articleService.listArticleUser(userId, loginId, size, offset);
    }

    @GetMapping("/tag/{userId}/{size}/{offset}")
    @Operation(summary = "게시글 목록 조회 (사용자 태그 기반) API",
            description = "PathVariable 형식 데이터 (int : userId, int : size(받을 데이터 개수), int : offset(이에 따른 페이지 번호)" +
                    " => ArticleListResponseDto return ")
    public List<ArticleListResponseDto> articleListUserTag(@Valid @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset) {
        return articleService.listArticleUserTag(userId, size, offset);
    }

    @GetMapping("/follow/{userId}/{size}/{offset}")
    @Operation(summary = "게시글 목록 조회 (사용자 팔로우 기반) API",
            description = "PathVariable 형식 데이터 (int : userId, int : size(받을 데이터 개수), int : offset(이에 따른 페이지 번호)" +
                    " => ArticleListResponseDto return ")
    public List<ArticleListResponseDto> articleListFollow (@Valid @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset) {
        return articleService.listArticleFollow(userId, size, offset);
    }


    @GetMapping("/tag-searchAll/{userId}/{size}/{offset}")
    @Operation(summary = "게시글 목록 조회 (태그 검색 기반) API =>  filter 범위 안에서 태그 기반으로 게시글 목록을 조회",
            description = "<b>[PathVariable 형식 데이터]</b><br>- int : userId <br>- int : size(받을 데이터 개수)<br>- int : offset(이에 따른 페이지 번호)<br><br>" +
                    "<b>[RequestParam 형식 데이터]</b><br>- String : filter ('A': 모든 게시물 / 'F': 팔로잉 유저들의 게시물 / 'M': 내 게시물)<br>- String : tagName (ex: 산,바다,...)<br><br>" +
                    " => ArticleListResponseDto return ")
    public List<ArticleListResponseDto> articleListSearchTagAll (@Valid @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset, @RequestParam("filter") String filter, @RequestParam("tagName") List<String> tags) {
        return articleService.listArticleSearchTagAll(userId, size, offset, filter, tags);
    }

    @GetMapping("/area/{userId}/{size}/{offset}")
    @Operation(summary = "게시글 목록 조회 (지역 검색 기반) API",
        description = "PathVariable 형식 데이터 (int : userId)" +
            "RequestParam 형식 데이터 (String : area)" +
            " => ArticleListResponseDto return ")
    public List<ArticleListResponseDto> articleListArea (@Valid @PathVariable("userId") int userId, @PathVariable("size") int size, @PathVariable("offset") int offset, @RequestParam("area") String area) {
        return articleService.listArticleArea(userId, size, offset, area);
    }

    @GetMapping("/area")
    @Operation(summary = "지역별 게시글 개수 조회 API =>  특정 유저가 작성한 게시글의 수를 지역별로 카운팅해서 반환",
        description = "RequestParam 형식 데이터 (int : userId)" +
            " => (지역,카운팅수) 리스트 Return ")
    public List<ArticleAreaCntDto> articleListArea (@RequestParam("userId") int userId) {
        return articleService.numArticleArea(userId);
    }

    @GetMapping()
    @Operation(summary = "사용자, 지역별 게시글 개수 조회 API =>  특정 유저가 작성한 특정 지역의 게시물을 반환",
        description = "RequestParam 형식 데이터 (int : userId, String : area)" +
            " =>ArticleCompactResponseDto Return")
    public List<ArticleCompactResponseDto> articleListAreaAndUser (@RequestParam("userId") int userId, @RequestParam("area") String area) {
        return articleService.listArticleAreaAndUser(userId, area);
    }



}
