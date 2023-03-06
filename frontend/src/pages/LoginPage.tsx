import React, { useEffect, useState } from 'react';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page__logo">
        <span className="logo__f">F</span>
        <span className="logo__a">a</span>
        <span className="logo__s">S</span>
        <span className="logo__t">T</span>
      </div>

      <form className="sign-up-page">
        <div className="sign-up-page__row">
          <div className="sign-up-page__row__text">
            <text className="sign-up-page__text">이메일</text>
          </div>
          <input className="card sign-up-page__input" type="email" />
        </div>
        <div className="sign-up-page__row">
          <div className="sign-up-page__row__text">
            <text className="sign-up-page__text">비밀번호</text>
          </div>
          <input
            className="card sign-up-page__input"
            type="password"
            placeholder="영어, 숫자 8~15자리"
          />
        </div>
      </form>
    </div>
  );
}
