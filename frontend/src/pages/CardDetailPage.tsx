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
  isDeleteOpen,
  handleDeleteOpen,
  handleDeleteClose,
  handleArticleDelete,
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
          handleDeleteOpen={handleDeleteOpen}
        />
        <Comments
          comments={comments}
          handleCommentClick={handleCommentClick}
          commentInputRef={commentInputRef}
          handleCommentSubmit={handleCommentSubmit}
        />
      </div>
      {isDeleteOpen ? (
        <div className="card-detail-page__delete">
          <div className="card-dateil-page__delete-content">
            정말 삭제하시겠습니까?
          </div>
          <div className="card-detail-page__delete-buttons">
            <button
              type="button"
              className="card-detail-page__delete-button--no"
              onClick={handleDeleteClose}
            >
              아니오
            </button>
            <button
              type="button"
              className="card-detail-page__delete-button--yes"
              onClick={handleArticleDelete}
            >
              예
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CardDetailPage;
