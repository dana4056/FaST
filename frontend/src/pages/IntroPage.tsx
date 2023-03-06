import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroPage() {
  const navigate = useNavigate();
  // 회원가입 하러가기
  const goSignUp = () => {
    navigate('/sign-up');
  };
  // 로그인 하러가기
  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div className="intro-page">
      <div className="intro-page__logo">FaST</div>
      <button
        className="card intro-page__button"
        type="button"
        onClick={goSignUp}
      >
        회원가입
      </button>
      <button
        className="card intro-page__button"
        type="button"
        onClick={goLogin}
      >
        로그인
      </button>
    </div>
  );
}
