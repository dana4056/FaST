import React, { useState, useEffect, useCallback } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TiDelete } from 'react-icons/ti';
import { getDownloadURL, ref } from 'firebase/storage';
import FollowItem from './FollowerItem';
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

function FollowList({ follower }: any) {
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
          {searchedFollower
            ? searchedFollower.map((user: any) => (
                <FollowItem key={user.fromUser.id} follower={user} />
              ))
            : follower.map((user: any) => (
                <FollowItem key={user.fromUser.id} follower={user} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default FollowList;
