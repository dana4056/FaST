import React, { useState, useEffect, useCallback } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TiDelete } from 'react-icons/ti';
import { getDownloadURL, ref } from 'firebase/storage';
import FollowingItem from './FollowingItem';
import NotFollowingItem from './NotFollowingItem';
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

function FollowList({ following, notFollowing }: any) {
  const [userInput, setUserInput] = useState('');
  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const searchedFollowing = following
    ? following.filter((user: any) =>
        user.toUser.nickname.toLowerCase().includes(userInput)
      )
    : [];

  const searchedNotFollowing = notFollowing
    ? notFollowing.filter((user: any) =>
        user.nickname.toLowerCase().includes(userInput)
      )
    : [];

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
          {searchedFollowing
            ? searchedFollowing.map((user: any) => (
                <FollowingItem key={user.toUser.id} following={user} />
                // <NotFollowingItem key={user.toUser.id} following={user} />
              ))
            : following.map((user: any) => (
                <FollowingItem key={user.toUser.id} following={user} />
              ))}
        </div>
        {userInput && (
          <div>
            <div className="not-following__title">새로운 사람</div>
            {searchedNotFollowing ? (
              searchedNotFollowing.map((user: any) => (
                <NotFollowingItem key={user.id} notFollowing={user} />
              ))
            ) : (
              <div>검색된 결과가 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowList;
