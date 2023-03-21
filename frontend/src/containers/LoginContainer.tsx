import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import api from '../api/login';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';

function LoginContainer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [salt, setSalt] = useState<string>('');
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
  // 로그인 하러가기
  const goLogin = async () => {
    const saltRes = await api.getSalt(email);
    // console.log(saltRes);
    if (saltRes.status === 200) {
      const pwd = createHashedPassword(password, saltRes.data);
      // console.log(saltRes.data);
      // console.log(pwd);
      const res = await api.login(email, pwd);
      if (res === 200) {
        navigate('/home');
      }
    }
  };

  // 카카오 로그인 하러가기
  const goKakaoLogin = () => {
    // navigate('/oauth2/authorization/kakao');
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  // 네이버 로그인 하러가기
  const goNaverLogin = () => {
    // navigate('/oauth2/authorization/naver');
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <LoginPage
      goLogin={goLogin}
      goKakaoLogin={goKakaoLogin}
      goNaverLogin={goNaverLogin}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
    />
  );
}

export default LoginContainer;
