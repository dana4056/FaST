import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeContainer from './containers/HomeContainer';

import './styles/main.scss';
import NewCardContainer from './containers/NewCardContainer';
import CardDetailContainer from './containers/CardDetailContainer';
import MyRecordContainer from './containers/MyRecordContainer';
import MapContainer from './containers/MapContainer';
import SignUpContainer from './containers/SignUpContainer';
import LoginContainer from './containers/LoginContainer';
import FollowContainer from './containers/FollowContainer';

function Test() {
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
          <Route path="/sign-up" element={<SignUpContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/follow" element={<FollowContainer />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default Test;
