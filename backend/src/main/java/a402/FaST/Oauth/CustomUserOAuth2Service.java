package a402.FaST.Oauth;

import a402.FaST.auth.PrincipalDetails;
import a402.FaST.model.entity.Authority;
import a402.FaST.model.entity.User;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomUserOAuth2Service extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(CustomUserOAuth2Service.class);

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // code를 통해 구성한 정보
        logger.info("userRequest clientRegistration : " + userRequest.getClientRegistration());
        // token을 통해 응답받은 회원정보
        logger.info("oAuth2User : " + oAuth2User);

        return processOAuth2User(userRequest, oAuth2User);

    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        // Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
        OAuth2UserInfo oAuth2UserInfo = null;

        // kakao naver 구분 하기 위한 provider 변수
        String provider = userRequest.getClientRegistration().getRegistrationId();

        if (provider.equals("kakao")) {
            logger.info("카카오톡 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo((Map)oAuth2User.getAttributes());
        }
        else if (provider.equals("naver")){
            logger.info("네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        }
        else {
            logger.info("지원하지 않는 로그인 요청입니다");
        }

        User user;
        if (userRepository.existsByEmail(oAuth2UserInfo.getEmail())) {
            user = userRepository.findByEmail(oAuth2UserInfo.getEmail()).get();
            userRepository.save(user);
            logger.info("가입 한적 있음");
        } else {
            Authority authority = Authority.builder()
                    .authorityName("ROLE_USER")
                    .build();

            user = User.builder()
                    .email(oAuth2UserInfo.getEmail())
                    //                    .password(passwordEncoder.encode(requestDto.getPassword()))
                    .nickname(oAuth2UserInfo.getName())
                    .img_path(oAuth2UserInfo.getProfile())
                    .authorities(Collections.singleton(authority))
                    .build();
            userRepository.save(user);
        }
        logger.info("성공");
        logger.info("user , {}", user);
        logger.info("oAuth2User , {}", oAuth2User.getAttributes());

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}
