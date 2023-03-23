import React, { useState, useEffect } from 'react';

import FollowPage from '../pages/FollowPage';
import followApi from '../api/follow';

function FollowContainer() {
  // 팔로우 목록 조회
  const [id, setId] = useState<number>(2);
  const [followData, setFollowData] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const followList: any = await followApi.followList(id);
      setFollowData(followList.data);
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log('followData', followData);
  }, [followData]);
  return (
    <div>
      <FollowPage followList={followData} />
    </div>
  );
}

export default FollowContainer;
