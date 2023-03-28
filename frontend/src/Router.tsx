import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeContainer from './containers/HomeContainer';
import StampContainer from './containers/StampContainer';
import NewCardContainer from './containers/NewCardContainer';
import CardDetailContainer from './containers/CardDetailContainer';
import MyRecordContainer from './containers/MyRecordContainer';
import MapContainer from './containers/MapContainer';
import FollowContainer from './containers/FollowContainer';
import UserModifyContainer from './containers/UserModifyContainer';
import FindPwdContainer from './containers/FindPwdContainer';

import './styles/main.scss';

function Router() {
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/home" element={<HomeContainer />} />
          <Route path="/newcard" element={<NewCardContainer />} />
          <Route path="/card/:cardId" element={<CardDetailContainer />} />
          <Route path="/myrecord" element={<MyRecordContainer />} />
          <Route path="/map" element={<MapContainer />} />
          <Route path="/follow" element={<FollowContainer />} />
          <Route path="/stamp" element={<StampContainer />} />
          <Route path="/mypage" element={<UserModifyContainer />} />
          {/* <Route path="/find-pwd" element={<FindPwdContainer />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default Router;
