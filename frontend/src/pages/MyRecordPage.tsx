import React from 'react';

import Card from '../components/PhotoCard';
import Profile from '../components/Profile';
import SearchBox from '../components/SearchBox';
import MoveToMap from '../components/MoveToMap';
import CardList from '../components/CardList';
import { MyRecordPageProps } from '../types/PagePropsType';

function MyRecordPage({
  isMine,
  nickname,
  imageUrl,
  followerNum,
  followingNum,
  articleNum,
  myTag,
  cardsLeft,
  cardsRight,
  setRef,
  isLoaded,
  isLimit,
  pageEnd,
}: any) {
  return (
    <div className="my-record-page">
      <Profile
        nickname={nickname}
        imageUrl={imageUrl}
        followerNum={followerNum}
        followingNum={followingNum}
        articleNum={articleNum}
        myTag={myTag}
      />
      <MoveToMap />
      <CardList
        isMine={isMine}
        cardsLeft={cardsLeft}
        cardsRight={cardsRight}
        setRef={setRef}
        isLoaded={isLoaded}
        isLimit={isLimit}
        pageEnd={pageEnd}
      />
    </div>
  );
}

export default MyRecordPage;
