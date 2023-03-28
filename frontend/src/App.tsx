import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import IntroPage from './pages/IntroPage';
import LoadingPage from './pages/LoadingPage';
import Router from './Router';
import LoginContainer from './containers/LoginContainer';
import SignUpContainer from './containers/SignUpContainer';
import ModelContainer from './containers/ModelContainer';

import './styles/main.scss';
import FindPwdContainer from './containers/FindPwdContainer';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/sign-up" element={<SignUpContainer />} />
        <Route path="/stamp/:model" element={<ModelContainer />} />
        <Route path="/find-pwd" element={<FindPwdContainer />} />
        <Route path="/*" element={<Router />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
