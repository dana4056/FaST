import React, { useEffect, useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiNaver, SiKakaotalk } from 'react-icons/si';
import { Canvas } from '@react-three/fiber';
import { LoginPageProps } from '../types/PagePropsType';
import Header from '../components/Header';
import Model from '../assets/blender/Logo';

export default function LoginPage({
  goLogin,
  goKakaoLogin,
  goNaverLogin,
  onChangeEmail,
  onChangePassword,
}: LoginPageProps) {
  return (
    <div className="login-page">
      <div className="login-page__logo">
        <Canvas camera={{ fov: 60, zoom: 4 }}>
          <ambientLight
            // eslint-disable-next-line react/no-unknown-property
            intensity={1.25}
          />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </div>

      <form className="login-page__wrapper" onSubmit={goLogin}>
        <div className="login-page__row">
          <div className="login-page__row__text">
            <span className="login-page__text">이메일</span>
          </div>
          <input
            placeholder="example@email.com"
            className="card login-page__input"
            type="email"
            onChange={onChangeEmail}
          />
        </div>
        <div className="login-page__row">
          <div className="login-page__row__text">
            <span className="login-page__text">비밀번호</span>
          </div>
          <input
            className="card login-page__input"
            type="password"
            placeholder="영어, 숫자 8~15자리"
            onChange={onChangePassword}
          />
        </div>
        <div className="login-page__row">
          <button className="card login-page__button" type="submit">
            로그인
          </button>
          <div className="login-page__row">
            <div className="login-page__row__pwd__text">
              <Link to="/find-pwd">비밀번호 찾기</Link>
            </div>
          </div>
        </div>
      </form>

      <div className="login-page__wrapper">
        <div className="login-page__row">
          <span className="login-page__text__fast__login">간편 로그인</span>
        </div>
        <div className="login-page__row">
          <button
            type="button"
            onClick={goNaverLogin}
            className="card login-page__social-button login-page__social--naver"
          >
            <SiNaver className="login-page__social-logo" />
            {/* <a href="http://localhost:8080/oauth2/authorization/naver"> */}
            {/* </a> */}
          </button>
          <button
            type="button"
            onClick={goKakaoLogin}
            className="card login-page__social-button login-page__social--kakao"
          >
            <SiKakaotalk className="login-page__social-logo" />
            {/* <a href="http://localhost:8080/oauth2/authorization/kakao"> */}
            {/* </a> */}
          </button>
        </div>
      </div>
    </div>
  );
}
