import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import FollowPage from '../pages/FollowPage';
import followApi from '../api/follow';

function FollowContainer() {
  const params = useParams();
  const [userState, setUserState] = useState<any>(params.userId);
  const [user, setUser] = useRecoilState(userInfo);

  const [isMine, setIsMine] = useState<boolean>(false);
  useEffect(() => {
    if (user.id.toString() === userState.toString()) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, []);

  // 팔로우 목록 조회
  const [id, setId] = useState<number>(userState);
  const [followData, setFollowData] = useState<any>({});
  // 팔로우 하지 않은 목록 조회
  const [notFollowingData, setNotFollowingData] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const followList: any = await followApi.followList(userState);
      setFollowData(followList.data);
    };
    getData();
  }, [notFollowingData]);

  useEffect(() => {
    const getData = async () => {
      const notFollowingList: any = await followApi.notFollowingList(userState);
      setNotFollowingData(notFollowingList.data);
      console.log(notFollowingData);
    };
    getData();
  }, []);
  useEffect(() => {
    // console.log('notFollowingData', notFollowingData);
  }, [followData, notFollowingData]);
  return (
    <div>
      <FollowPage
        followList={followData}
        notFollowingList={notFollowingData}
        isMine={isMine}
      />
    </div>
  );
}

export default FollowContainer;
