import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import IntroContainer from './containers/IntroContainer';
import LoadingPage from './pages/LoadingPage';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';
import FindPwdContainer from './containers/FindPwdContainer';
import AuthRouter from './AuthRouter';

import './styles/main.scss';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<IntroContainer />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />
        <Route path="/find-pwd" element={<FindPwdContainer />} />
        <Route path="/*" element={<AuthRouter />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
