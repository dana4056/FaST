import React, { useState } from 'react';

import FollowList from '../components/FollowList';

function FollowPage() {
  const tabList = [
    {
      id: 0,
      title: '팔로워',
      content: <FollowList />,
    },
    {
      id: 1,
      title: '팔로잉',
      content: <FollowList />,
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
        {tabList[0].content}
        {tabList[1].content}
      </div>
    </div>
  );
}

export default FollowPage;
