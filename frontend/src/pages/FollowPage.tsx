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
    <div>
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
      <div className="contentArea">{tabList[currentTab].content}</div>
    </div>
  );
}

export default FollowPage;
