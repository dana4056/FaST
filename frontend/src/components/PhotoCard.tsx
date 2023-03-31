import React from 'react';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { BsTrash } from '@react-icons/all-files/bs/BsTrash';
import { useNavigate, Link } from 'react-router-dom';

import Heart from './Heart';
import { TagType } from '../types/TagType';
import Tag from './Tag';
import { PhotoCardProps } from '../types/ComponentPropsType';

function PhotoCard({ card }: PhotoCardProps) {
  // 내 카드인지 - 나중에 로그인 처리했을 때 card.nickname과 비교해서 정하도록
  const isMine = true;
  const navigate = useNavigate();

  const onClickMoveDetail = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div
      className="photo-card card"
      role="presentation"
      onClick={() => onClickMoveDetail(card.id)}
    >
      <img
        className="photo-card__image"
        src={card.imageUrls[0]}
        alt="photocardimg"
      />
      <div className="photo-card__row">
        <div className="photo-card__like">
          <Heart />
          {card.numLikes} Likes
        </div>
        {isMine ? (
          <div className="photo-card__buttons">
            <button
              type="button"
              className="photo-card__button transparent-button"
            >
              <BsPencil />
            </button>
            <button
              type="button"
              className="photo-card__button transparent-button"
            >
              <BsTrash />
            </button>
          </div>
        ) : (
          card.nickname
        )}
      </div>
      <div className="photo-card__tags">
        {card.tags.map((tag: TagType) => (
          <Tag key={tag.value} className={tag.className} handleTagDelete={null}>
            {tag.value}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default PhotoCard;
