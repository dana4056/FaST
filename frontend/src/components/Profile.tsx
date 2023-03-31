import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileProps } from '../types/ComponentPropsType';
import { TagType } from '../types/TagType';
import Tag from './Tag';

function Profile({
  nickname,
  imageUrl,
  followerNum,
  followingNum,
  articleNum,
  myTag,
}: ProfileProps) {
  return (
    <div className="profile__container">
      <img src={imageUrl} alt="profileImg" className="profile__img" />
      <span className="profile__nickname">{nickname}</span>
      <div className="profile__card card">
        <Link to="/follow">
          <div className="profile__cnt">
            <div className="profile__follower">팔로워</div>
            <div className="profile__following">팔로잉</div>
            <div className="profile__record">기록수</div>
            <div className="profile__follower__cnt">{followerNum}</div>
            <div className="profile__following__cnt">{followingNum}</div>
            <div className="profile__record__cnt">{articleNum}</div>
          </div>
        </Link>
      </div>
      <div className="profile__hashtags">
        <div className="profile__tags card">
          {myTag.map((tag: TagType) => (
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
