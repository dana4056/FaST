import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from './atoms/userInfo';

import ModelContainer from './containers/ModelContainer';
import Router from './Router';

function AuthRouter() {
  const user = useRecoilValue(userInfo);
  if (user.email.length === 0) {
    window.location.href = '/login';
  }

  return (
    <Routes>
      <Route path="/stamp/:model" element={<ModelContainer />} />
      <Route path="/*" element={<Router />} />
    </Routes>
  );
}

export default AuthRouter;
