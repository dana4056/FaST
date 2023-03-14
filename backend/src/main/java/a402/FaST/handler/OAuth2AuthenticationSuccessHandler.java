package a402.FaST.handler;

import a402.FaST.jwt.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    TokenProvider tokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        // redirect 할 url을 지정해준다
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        String targetUrl = "http://localhost:3000/home";
//        String targetUrl = "/oauth2/social/success";

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        String jwt = tokenProvider.createToken(authentication);
//        System.out.println(jwt);

//        // 4. RefreshToken 저장
//        RefreshToken refreshToken = RefreshToken.builder()
//                .key(authentication.getName())
//                .value(tokenDto.getRefreshToken())
//                .build();
//
//        refreshTokenRepository.save(refreshToken);
//
//        int cookieMaxAge = tokenProvider.getExpiration().intValue() / 60;
//
//        CookieUtil.deleteCookie(request, response, "refreshToken");
//        CookieUtil.addCookie(response, "refreshToken", tokenDto.getRefreshToken(), cookieMaxAge);
//
//        CookieUtil.deleteCookie(request, response, "grantType");
//        CookieUtil.addCookie(response, "grantType", tokenDto.getGrantType(), cookieMaxAge);
//
//        CookieUtil.deleteCookie(request, response, "accessTokenExpiresIn");
//        CookieUtil.addCookie(response, "accessTokenExpiresIn", Long.toString(tokenDto.getAccessTokenExpiresIn()), cookieMaxAge);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("accessToken", jwt)
                .build().toUriString();
    }


}