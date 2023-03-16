import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import Model from '../assets/blender/Logo';

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
      <Canvas className="intro-page__logo" camera={{ fov: 60 }}>
        <ambientLight
          // eslint-disable-next-line react/no-unknown-property
          intensity={1.25}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
      <div className="intro-page__buttons">
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
    </div>
  );
}
