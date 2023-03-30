import React, { useState, useEffect, useCallback } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';
import { storage } from '../utils/firebase';
import followApi from '../api/follow';

function NotFollowItem({ notFollowing }: any) {
  const [user, setUser] = useRecoilState(userInfo);
  const [profileImg, setProfileImg] = useState<string>('');

  useEffect(() => {
    if (notFollowing.img_path.substring(0, 4) === 'http') {
      setProfileImg(notFollowing.img_path);
    } else if (
      notFollowing.img_path === 'profiles/thereisnotruth12@gmail.com'
    ) {
      setProfileImg('');
    } else {
      const getProfileImage = async () => {
        const imageRef = ref(storage, notFollowing.img_path);
        const ret = await getDownloadURL(imageRef);
        setProfileImg(ret);
      };
      getProfileImage();
    }
  }, []);

  // 팔로잉 추가 api
  const onClickAdd = async (followingId: number) => {
    const followingDelete: any = await followApi.followAdd(
      user.id,
      followingId
    );
    window.location.reload();
    return followingDelete;
  };

  return (
    <div>
      <div key={notFollowing.id} className="follow_box card">
        <img className="follow_profile_img" src={profileImg} alt="profileImg" />
        <div className="follow_id">{notFollowing.nickname}</div>
        <button
          className="follow_btn"
          type="button"
          onClick={() => onClickAdd(notFollowing.id)}
        >
          팔로잉
        </button>
      </div>
    </div>
  );
}

export default NotFollowItem;
