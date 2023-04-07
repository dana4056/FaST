import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import Modal from './Modal';
import followApi from '../api/follow';
import useViewModel from '../viewmodels/ArticleViewModel';

function FollowItem({ follower, isMine }: any) {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  const onClickMoveRecord = (id: number) => {
    navigate(`/record/${id}`);
  };
  const { downloadImages } = useViewModel();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const [profileImg, setProfileImg] = useState<string>('');

  useEffect(() => {
    if (follower.fromUser.imgPath.substring(0, 4) === 'http') {
      setProfileImg(follower.fromUser.imgPath);
    } else {
      const getProfileImage = async () => {
        const ret = await downloadImages([follower.fromUser.imgPath]);
        setProfileImg(ret[0]);
      };
      getProfileImage();
    }
  }, []);

  // 팔로워 삭제 api
  const [toId, setToId] = useState<number>(user.id);
  const onClickDelete = async (followerId: number) => {
    const followerDelete: any = await followApi.followDelete(followerId, toId);
    setOpenModal(!openModal);
    window.location.reload();
    return followerDelete;
  };
  return (
    <div
      role="presentation"
      onClick={() => onClickMoveRecord(follower.fromUser.id)}
    >
      <div key={follower.fromUser.id} className="follow_box card">
        <img className="follow_profile_img" src={profileImg} alt="profileImg" />
        <div className="follow_id">{follower.fromUser.nickname}</div>

        {openModal && (
          <Modal onClickToggleModal={onClickToggleModal}>
            <div className="follow_delete_modal">
              <h3 className="follow_delete_text">
                {follower.fromUser.nickname}님의 <br /> 팔로잉을 끊으시겠습니까?{' '}
              </h3>
              <div>
                <p>
                  팔로워를 끊으면 {follower.fromUser.nickname}님에게 <br />{' '}
                  회원님의 게시물이 보이지 않습니다.
                </p>
              </div>
              <button
                className="follow_delete_btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickDelete(follower.fromUser.id);
                }}
              >
                팔로워 끊기
              </button>
              <button
                className="follow_delete_btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(!openModal);
                }}
              >
                취소
              </button>
            </div>
          </Modal>
        )}
        {isMine ? (
          <button
            className="follow_btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevent event from propagating
              onClickToggleModal();
            }}
          >
            삭제
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FollowItem;
