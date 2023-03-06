import React from 'react';

import CardDetail from '../components/carddetail/CardDetail';
import Comments from '../components/carddetail/Comments';

import { CardDetailPageProps } from '../types/PagePropsType';

function CardDetailPage({
  handleLikeClick,
  card,
  comments,
  isMenuOpen,
  handleMenuClick,
  isCommentOpen,
  handleCommentClick,
}: CardDetailPageProps) {
  return (
    <div className="card-detail-page">
      <div
        className="card-detail-page__wrapper"
        style={isCommentOpen ? { transform: 'translateX(-100%)' } : {}}
      >
        <CardDetail
          card={card}
          handleLikeClick={handleLikeClick}
          isMenuOpen={isMenuOpen}
          handleMenuClick={handleMenuClick}
          handleCommentClick={handleCommentClick}
        />
        <Comments comments={comments} handleCommentClick={handleCommentClick} />
      </div>
    </div>
  );
}

export default CardDetailPage;
