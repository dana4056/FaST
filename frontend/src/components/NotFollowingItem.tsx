import React, { useState, useEffect, useCallback } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import { storage } from '../utils/firebase';
import followApi from '../api/follow';

function NotFollowItem({ notFollowing, isMine }: any) {
  const [user, setUser] = useRecoilState(userInfo);
  const [profileImg, setProfileImg] = useState<string>('');

  const navigate = useNavigate();

  const onClickMoveRecord = (id: number) => {
    navigate(`/record/${id}`);
  };

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

  const onClickAdd = async (
    followingId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const followingDelete: any = await followApi.followAdd(
      user.id,
      followingId
    );
    window.location.reload();
    return followingDelete;
  };

  return (
    <div role="presentation" onClick={() => onClickMoveRecord(notFollowing.id)}>
      <div key={notFollowing.id} className="follow_box card">
        <img className="follow_profile_img" src={profileImg} alt="profileImg" />
        <div className="follow_id">{notFollowing.nickname}</div>
        {isMine ? (
          <button
            className="follow_btn"
            type="button"
            onClick={(e) => onClickAdd(notFollowing.id, e)}
          >
            팔로잉
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default NotFollowItem;
