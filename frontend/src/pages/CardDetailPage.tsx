import React from 'react';

import CardDetail from '../components/carddetail/CardDetail';
import Comments from '../components/carddetail/Comments';

import { CardDetailPageProps } from '../types/PagePropsType';

function CardDetailPage({
  user,
  handleLikeClick,
  card,
  comments,
  isMenuOpen,
  handleMenuClick,
  isCommentOpen,
  handleCommentClick,
  commentInputRef,
  handleCommentSubmit,
  handleModifyClick,
  handleDeleteClick,
}: CardDetailPageProps) {
  return (
    <div className="card-detail-page">
      <div
        className="card-detail-page__wrapper"
        style={isCommentOpen ? { transform: 'translateX(-100%)' } : {}}
      >
        <CardDetail
          user={user}
          card={card}
          handleLikeClick={handleLikeClick}
          isMenuOpen={isMenuOpen}
          handleMenuClick={handleMenuClick}
          handleCommentClick={handleCommentClick}
          handleModifyClick={handleModifyClick}
          handleDeleteClick={handleDeleteClick}
        />
        <Comments
          comments={comments}
          handleCommentClick={handleCommentClick}
          commentInputRef={commentInputRef}
          handleCommentSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
}

export default CardDetailPage;
