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
  card,
  handleLikeClick,
  isMenuOpen,
  handleMenuClick,
  handleCommentClick,
}: CardDetailProps) {
  return (
    <div className="card card-detail">
      <div className="card-detail__header">
        <div className="card-detail__profile-image">
          <CgProfile />
        </div>
        <div className="card-detail__profile-nickname">{card.nickname}</div>
        <button
          type="button"
          className="card-detail__menu-button transparent-button"
          onClick={handleMenuClick}
        >
          <BsThreeDots />
        </button>
        {isMenuOpen ? (
          <div className="card-detail__menu">
            <div className="card-detail__modify">수정</div>
            <hr />
            <div className="card-detail__remove">삭제</div>
          </div>
        ) : null}
      </div>
      <div className="card-detail__content">
        <ImageSliderContainer imageUrls={card.imageUrls} />
      </div>
      <div className="card-detail__footer">
        <div className="card-detail__sns">
          <div className="card-detail__like">
            <Heart cardId={card.id} />
            <span>{card.numLikes} Likes</span>
          </div>
          <button
            type="button"
            className="card-detail__comment transparent-button"
            onClick={handleCommentClick}
          >
            <BiComment />
            <span>{card.numComments} 개</span>
          </button>
        </div>
        <div className="card-detail__info">
          <div className="card-detail__info-data">{card.nickname}</div>
          <div className="card-detail__info-data">{card.regTime}</div>
          <div className="card-detail__info-data">{card.content}</div>
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
      </div>
    </div>
  );
}

export default CardDetail;
