import React, { useState, useEffect, useCallback } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TiDelete } from 'react-icons/ti';
import { getDownloadURL, ref } from 'firebase/storage';
import { BsPersonCircle } from 'react-icons/bs';
import { storage } from '../utils/firebase';
import Modal from './Modal';
import cardimg from '../assets/images/photocardimg.jpeg';
import sample1 from '../assets/images/sample-images/sample_1.jpg';
import {
  UserProps,
  UserItemProps,
  FollowProps,
} from '../types/ComponentPropsType';
import followApi from '../api/follow';

function FollowItem({ following }: any) {
  const [profileImg, setProfileImg] = useState<string>('');

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
  const [fromId, setFromId] = useState<number>(2);
  const onClickDelete = async (followingId: number) => {
    const followingDelete: any = await followApi.followDelete(
      fromId,
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
