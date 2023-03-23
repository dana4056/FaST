import React, { useState } from 'react';

import FollowList from '../components/FollowList';
import { FollowPageProps } from '../types/PagePropsType';

function FollowPage({ followList }: any) {
  // console.log('followPage', followList.follower);
  const tabList = [
    {
      id: 0,
      title: '팔로워',
    },
    {
      id: 1,
      title: '팔로잉',
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);
  const [underlinePosition, setUnderlinePosition] = useState(0);

  const selectTapHandler = (index: number) => {
    setCurrentTab(index);
    setUnderlinePosition(index * 100);
  };

  return (
    <div className="follow-page">
      <div className="menuBar">
        <div>
          {tabList.map((tab) => {
            return (
              <button
                key={tab.id}
                type="button"
                className={currentTab === tab.id ? 'submenufocused' : 'submenu'}
                onClick={() => selectTapHandler(tab.id)}
              >
                {tab.title}
              </button>
            );
          })}
          <div
            className="underline"
            style={{ transform: `translateX(${underlinePosition}%)` }}
          />
        </div>
      </div>

      <div
        className="follow-page__user"
        style={currentTab === 1 ? { transform: 'translate(-50%)' } : {}}
      >
        <FollowList follower={followList.follower} />
        <FollowList follower={followList.follower} />
      </div>
    </div>
  );
}

export default FollowPage;
