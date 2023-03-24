import React, { useState, useEffect } from 'react';

import FollowPage from '../pages/FollowPage';
import followApi from '../api/follow';

function FollowContainer() {
  // 팔로우 목록 조회
  const [id, setId] = useState<number>(2);
  const [followData, setFollowData] = useState<any>({});
  // 팔로우 하지 않은 목록 조회
  const [notFollowingData, setNotFollowingData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const followList: any = await followApi.followList(id);
      setFollowData(followList.data);
    };
    getData();
  }, [notFollowingData]);

  useEffect(() => {
    const getData = async () => {
      const notFollowingList: any = await followApi.notFollowingList(id);
      setNotFollowingData(notFollowingList.data);
    };
    getData();
  }, []);
  useEffect(() => {
    // console.log('notFollowingData', notFollowingData);
  }, [followData, notFollowingData]);
  return (
    <div>
      <FollowPage followList={followData} notFollowingList={notFollowingData} />
    </div>
  );
}

export default FollowContainer;
