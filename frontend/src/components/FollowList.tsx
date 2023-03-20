import React, { useState, useEffect, useCallback } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TiDelete } from 'react-icons/ti';
import Modal from './Modal';
import cardimg from '../assets/images/photocardimg.jpeg';
import sample1 from '../assets/images/sample-images/sample_1.jpg';

interface User {
  id: number;
  userId: string;
  profileImg: any;
  searchText?: string;
  searchCnt: number;
}

interface UserItemProps {
  user: User;
}

function UserItem({ user }: UserItemProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  return (
    <div key={user.id} className="follow_box card">
      <img
        className="follow_profile_img"
        src={user.profileImg}
        alt={user.userId}
      />
      <text className="follow_id">{user.userId}</text>

      {openModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <div className="follow_delete_modal">
            <h3 className="follow_delete_text">
              {user.userId}님의 <br /> 팔로잉을 끊으시겠습니까?{' '}
            </h3>
            <div>
              <p>
                팔로워를 끊으면 {user.userId}님에게 <br /> 회원님의 게시물이
                보이지 않습니다.
              </p>
            </div>
            <button className="follow_delete_btn" type="button">
              팔로워 끊기
            </button>
            <button
              className="follow_delete_btn"
              type="button"
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              취소
            </button>
          </div>
        </Modal>
      )}
      <button className="follow_btn" type="button" onClick={onClickToggleModal}>
        삭제
      </button>
    </div>
  );
}

function FollowList() {
  const data: Array<User> = [
    {
      id: 1,
      userId: 'ㅁㅁㅁㅁ',
      profileImg: sample1,
      searchCnt: 0,
    },
    {
      id: 2,
      userId: 'abcd',
      profileImg: cardimg,
      searchCnt: 0,
    },
  ];

  const [userInput, setUserInput] = useState('');
  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const searched = data.filter((user) =>
    user.userId.toLowerCase().includes(userInput)
  );

  const deleteInput = (e: React.MouseEvent<SVGAElement>) => {
    setUserInput('');
    console.log(userInput);
  };

  return (
    <div className="follow-list-container">
      <div className="form_text">
        <div className="input_box card">
          <input
            type="text"
            className="ui_text"
            placeholder="검색"
            onChange={getValue}
            value={userInput}
          />
          <HiMagnifyingGlass className="magnifier" />
          {userInput && (
            <TiDelete className="input_delete_btn" onClick={deleteInput} />
          )}
        </div>
        <div>
          {searched
            ? searched.map((user) => <UserItem key={user.id} user={user} />)
            : data.map((user) => <UserItem key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  );
}

export default FollowList;
