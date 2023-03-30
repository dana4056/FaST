import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';
import { storage } from '../utils/firebase';

import followApi from '../api/follow';

function FollowItem({ following }: any) {
  const [profileImg, setProfileImg] = useState<string>('');
  const [user, setUser] = useRecoilState(userInfo);
  useEffect(() => {
    if (following.toUser.imgPath.substring(0, 4) === 'http') {
      setProfileImg(following.toUser.imgPath);
    } else {
      const getProfileImage = async () => {
        const imageRef = ref(storage, following.toUser.imgPath);
        const ret = await getDownloadURL(imageRef);
        setProfileImg(ret);
      };
      getProfileImage();
    }
  }, []);

  // 팔로잉 취소 api
  const onClickDelete = async (followingId: number) => {
    const followingDelete: any = await followApi.followDelete(
      user.id,
      followingId
    );
    window.location.reload();
    return followingDelete;
  };

  return (
    <div>
      <div key={following.toUser.id} className="follow_box card">
        <img className="follow_profile_img" src={profileImg} alt="profileImg" />
        <div className="follow_id">{following.toUser.nickname}</div>
        <button
          className="follow_btn"
          type="button"
          onClick={() => onClickDelete(following.toUser.id)}
        >
          팔로잉취소
        </button>
      </div>
    </div>
  );
}

export default FollowItem;
