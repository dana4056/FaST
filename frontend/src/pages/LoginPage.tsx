import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  // 로그인 하러가기
  const goLogin = () => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-page__logo">
        <span className="logo__f">F</span>
        <span className="logo__a">a</span>
        <span className="logo__s">S</span>
        <span className="logo__t">T</span>
      </div>

      <form className="login-page">
        <div className="login-page__row">
          <div className="login-page__row__text">
            <text className="login-page__text">이메일</text>
          </div>
          <input className="card login-page__input" type="email" />
        </div>
        <div className="login-page__row">
          <div className="login-page__row__text">
            <text className="login-page__text">비밀번호</text>
          </div>
          <input
            className="card login-page__input"
            type="password"
            placeholder="영어, 숫자 8~15자리"
          />
        </div>
      </form>

      <button
        className="card login-page__button"
        type="button"
        onClick={goLogin}
      >
        로그인
      </button>
    </div>
  );
}
