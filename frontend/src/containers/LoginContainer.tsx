import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginPage from '../pages/LoginPage';
import api from '../api/login';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';
import { userInfo } from '../atoms/userInfo';

function LoginContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFail, setIsFail] = useState<boolean>(false);
  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
    },
    []
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
    },
    []
  );
  const handleModalClose = () => {
    setIsFail(false);
  };
  // 로그인 하러가기
  const goLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saltRes = await api.getSalt(email);
    if (saltRes.status === 200) {
      const pwd = createHashedPassword(password, saltRes.data);
      const res = await api.login(email, pwd);
      if (res.status === 200) {
        // recoil-persist로 localstorage에 user 정보 저장
        setUser(res.data);
        navigate('/home');
      } else {
        setIsFail(true);
      }
    } else {
      setIsFail(true);
    }
  };

  // 카카오 로그인 하러가기
  const goKakaoLogin = () => {
    // navigate('/oauth2/authorization/kakao');
    window.location.href =
      'https://j8a402.p.ssafy.io:8080/oauth2/authorization/kakao';
  };

  // 네이버 로그인 하러가기
  const goNaverLogin = () => {
    // navigate('/oauth2/authorization/naver');
    window.location.href =
      'https://j8a402.p.ssafy.io:8080/oauth2/authorization/naver';
  };

  return (
    <LoginPage
      goLogin={goLogin}
      goKakaoLogin={goKakaoLogin}
      goNaverLogin={goNaverLogin}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      isFail={isFail}
      handleModalClose={handleModalClose}
    />
  );
}

export default LoginContainer;
