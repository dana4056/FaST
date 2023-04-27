import React from 'react';
import { CgProfile } from '@react-icons/all-files/cg/CgProfile';
import { BsThreeDots } from '@react-icons/all-files/bs/BsThreeDots';
import { BiComment } from '@react-icons/all-files/bi/BiComment';

import Heart from '../Heart';
import { TagType } from '../../types/TagType';
import Tag from '../Tag';
import ImageSliderContainer from '../../containers/ImageSliderContainer';
import { CardDetailProps } from '../../types/ComponentPropsType';

function CardDetail({
  user,
  card,
  handleModifyClick,
  handleLikeClick,
  isMenuOpen,
  handleMenuClick,
  handleCommentClick,
  handleDeleteOpen,
  handleFollow,
  handleUnfollow,
  handleMoveUserPage,
}: CardDetailProps) {
  return (
    <div className="card-detail-container">
      <div className="card card-detail">
        <div className="card-detail__header">
          <div
            className="card-detail__profile-image"
            role="presentation"
            onClick={handleMoveUserPage}
          >
            <img src={card.profile} alt="" />
          </div>
          <div
            className="card-detail__profile-nickname"
            role="presentation"
            onClick={handleMoveUserPage}
          >
            {card.nickname}
          </div>
          {card.followingCheck ? (
            <button
              type="button"
              className="card-detail__follow-button"
              onClick={handleUnfollow}
            >
              팔로우 취소
            </button>
          ) : (
            <button
              type="button"
              className="card-detail__follow-button"
              onClick={handleFollow}
            >
              팔로우
            </button>
          )}
          {user.id === card.userId ? (
            <button
              type="button"
              className="card-detail__menu-button transparent-button"
              onClick={handleMenuClick}
            >
              <BsThreeDots />
            </button>
          ) : null}
          {isMenuOpen ? (
            <div className="card-detail__menu">
              <div
                className="card-detail__modify"
                role="presentation"
                onClick={handleModifyClick}
              >
                수정
              </div>
              <hr />
              <div
                className="card-detail__remove"
                role="presentation"
                onClick={handleDeleteOpen}
              >
                삭제
              </div>
            </div>
          ) : null}
        </div>
        <div className="card-detail__content">
          <ImageSliderContainer imageUrls={card.imageUrls} />
        </div>
        <div className="card-detail__footer">
          <div className="card-detail__sns">
            <div className="card-detail__like">
              <Heart
                cardId={card.id}
                cntLike={card.numLikes}
                isLike={card.isLike}
                type="article"
              />
            </div>
            <button
              type="button"
              className="card-detail__comment transparent-button"
              onClick={handleCommentClick}
            >
              <BiComment />
              <span>{card.numComments} 개</span>
            </button>
            <div className="card-detail__reg-time">{card.regTime}</div>
          </div>
          <div className="card-detail__tags">
            {card.tags.map((tag: TagType) => (
              <Tag
                className={tag.className}
                handleTagDelete={null}
                key={tag.value}
              >
                {tag.value}
              </Tag>
            ))}
          </div>
          <div className="card-detail__content">{card.content}</div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
