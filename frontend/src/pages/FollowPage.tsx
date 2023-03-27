import React, { useState } from 'react';

import FollowerList from '../components/FollowerList';
import FollowingList from '../components/FollowingList';
import { FollowPageProps } from '../types/PagePropsType';

const tabList = [
  { id: 0, title: '팔로워' },
  { id: 1, title: '팔로잉' },
];

function FollowPage({ followList, notFollowingList }: any) {
  const [currentTab, setCurrentTab] = useState(() => {
    // Get the current tab index from localStorage, or default to 0 if not found
    const savedTabIndex = localStorage.getItem('currentTab');
    return savedTabIndex ? parseInt(savedTabIndex, 10) : 0;
  });

  const [underlinePosition, setUnderlinePosition] = useState(currentTab * 100);

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
    setUnderlinePosition(index * 100);

    localStorage.setItem('currentTab', index.toString());
  };

  return (
    <div className="follow-page">
      <div className="menuBar">
        <div>
          {tabList.map((tab) => {
            return (
              <button
                key={tab.title}
                type="button"
                className={currentTab === tab.id ? 'submenufocused' : 'submenu'}
                onClick={() => selectTabHandler(tab.id)}
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
        <FollowerList follower={followList.follower} />
        <FollowingList
          following={followList.following}
          notFollowing={notFollowingList}
        />
      </div>
    </div>
  );
}

export default FollowPage;
