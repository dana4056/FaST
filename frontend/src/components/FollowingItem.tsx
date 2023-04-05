import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import { storage } from '../utils/firebase';
import useViewModel from '../viewmodels/ArticleViewModel';

import followApi from '../api/follow';

function FollowItem({ following, isMine }: any) {
  const [profileImg, setProfileImg] = useState<string>('');
  const [user, setUser] = useRecoilState(userInfo);

  const navigate = useNavigate();

  const { downloadImages } = useViewModel();

  const onClickMoveRecord = (id: number) => {
    navigate(`/record/${id}`);
  };

  useEffect(() => {
    if (following.toUser.imgPath.substring(0, 4) === 'http') {
      setProfileImg(following.toUser.imgPath);
    } else {
      const getProfileImage = async () => {
        const ret = await downloadImages([following.toUser.imgPath]);
        setProfileImg(ret[0]);
      };
      getProfileImage();
    }
  }, []);

  // 팔로잉 취소 api
  const onClickDelete = async (
    followingId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const followingDelete: any = await followApi.followDelete(
      user.id,
      followingId
    );
    window.location.reload();
    return followingDelete;
  };

  return (
    <div
      role="presentation"
      onClick={() => onClickMoveRecord(following.toUser.id)}
    >
      <div key={following.toUser.id} className="follow_box card">
        <img className="follow_profile_img" src={profileImg} alt="profileImg" />
        <div className="follow_id">{following.toUser.nickname}</div>
        {isMine ? (
          <button
            className="follow_btn"
            type="button"
            onClick={(e) => onClickDelete(following.toUser.id, e)}
          >
            팔로잉취소
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FollowItem;
