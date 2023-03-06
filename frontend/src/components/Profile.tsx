import React from 'react';

import { BsPersonCircle } from 'react-icons/bs';
import { TagType } from '../types/TagType';
import Tag from './Tag';

function Profile() {
  const tags: TagType[] = [
    { value: 'tag1', className: 'profile__tag' },
    { value: 'tag2', className: 'profile__tag' },
    { value: 'tag3', className: 'profile__tag' },
    { value: 'tag4', className: 'profile__tag' },
    { value: 'tag5', className: 'profile__tag' },
  ];
  return (
    <div className="profile__container">
      <BsPersonCircle className="profile__img" />
      <div className="profile__card card">
        <div className="profile__cnt">
          <div className="profile__follower">팔로워</div>
          <div className="profile__following">팔로잉</div>
          <div className="profile__record">기록수</div>
          <div className="profile__follower__cnt">123</div>
          <div className="profile__following__cnt">123</div>
          <div className="profile__record__cnt">123</div>
        </div>
      </div>
      <div className="profile__hashtags">
        <div className="profile__tags card">
          {tags.map((tag: TagType) => (
            <Tag
              key={tag.value}
              className={tag.className}
              handleTagDelete={null}
            >
              {tag.value}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
