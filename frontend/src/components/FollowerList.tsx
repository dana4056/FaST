import React, { useState } from 'react';
import { TiDelete } from '@react-icons/all-files/ti/TiDelete';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import FollowItem from './FollowerItem';

function FollowList({ follower, isMine }: any) {
  const [userInput, setUserInput] = useState('');
  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };
  const searchedFollower = follower
    ? follower.filter((user: any) =>
        user.fromUser.nickname.toLowerCase().includes(userInput)
      )
    : [];
  const deleteInput = (e: React.MouseEvent<SVGAElement>) => {
    setUserInput('');
  };

  return (
    <div className="follow-list-container">
      <div className="form_text">
        <div className="input_box card">
          <input
            type="text"
            className="ui_text"
            placeholder="팔로워 검색"
            onChange={getValue}
            value={userInput}
          />
          <BsSearch className="magnifier" />
          {userInput && (
            <TiDelete className="input_delete_btn" onClick={deleteInput} />
          )}
        </div>
        <div>
          {searchedFollower
            ? searchedFollower.map((user: any) => (
                <FollowItem
                  key={user.fromUser.id}
                  follower={user}
                  isMine={isMine}
                />
              ))
            : follower.map((user: any) => (
                <FollowItem
                  key={user.fromUser.id}
                  follower={user}
                  isMine={isMine}
                />
              ))}
          <div className="follow__message">
            {searchedFollower.length === 0 && userInput !== ''
              ? `팔로워 중에 ${userInput}님은 없어요 :(`
              : null}
          </div>
          <div className="follow__message">
            {userInput === '' &&
              follower?.length === 0 &&
              `아직 팔로워가 없어요 :(`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowList;
