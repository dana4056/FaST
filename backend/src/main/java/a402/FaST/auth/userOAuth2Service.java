package a402.FaST.auth;

import a402.FaST.model.entity.Authority;
import a402.FaST.model.entity.User;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class userOAuth2Service extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(userOAuth2Service.class);

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
        OAuth2UserInfo oAuth2UserInfo = null;

        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")){
            logger.info("카카오톡 로그인 요청");
//            oAuth2UserInfo = new KakaoUserInfo((Map)oAuth2User.getAttributes());
        }
//        else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")){
//            logger.info("네이버 로그인 요청");
//            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
//        }
        else {
            logger.info("지원하지 않는 로그인 요청입니다");
        }


        Map<String, Object> attributes = oAuth2User.getAttributes();

        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
        String email = (String) kakao_account.get("email");
            logger.info("email : " + email);

        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        String nickname = (String) properties.get("nickname");
            logger.info("nickname : " + nickname);

        Map<String, Object> imgs = (Map<String, Object>) attributes.get("properties");
        String img = (String) imgs.get("profile_image");
            logger.info("img : " + img);

            if (userRepository.existsByEmail(email)) {
            logger.info("가입 한적 있음");
        } else {
            Authority authority = Authority.builder()
                    .authorityName("ROLE_USER")
                    .build();

            User user = User.builder()
                    .email(email)
    //                    .password(passwordEncoder.encode(requestDto.getPassword()))
                    .nickname(nickname)
                    .img_path(img)
                    .authorities(Collections.singleton(authority))
                    .build();
            userRepository.save(user);
        }
    return null;
    }
}
