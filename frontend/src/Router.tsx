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

import './styles/main.scss';
import ModifyPwdContainer from './containers/ModifyPwdContainer';
import ModifyArticleContainer from './containers/ModifyArticleContainer';
import PeopleContainer from './containers/PeopleContainer';

function Router() {
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/home" element={<HomeContainer />} />
          <Route path="/newcard" element={<NewCardContainer />} />
          <Route
            path="/modify-article/:articleId"
            element={<ModifyArticleContainer />}
          />
          <Route path="/article/:cardId" element={<CardDetailContainer />} />
          <Route path="/record/:userId" element={<MyRecordContainer />} />
          <Route path="/map/:userId" element={<MapContainer />} />
          <Route path="/follow/:userId" element={<FollowContainer />} />
          <Route path="/stamp" element={<StampContainer />} />
          <Route path="/mypage" element={<UserModifyContainer />} />
          <Route path="/modify-pwd" element={<ModifyPwdContainer />} />
          <Route path="/people" element={<PeopleContainer />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default Router;
