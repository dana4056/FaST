import React from 'react';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';

import CommentContainer from '../../containers/CommentContainer';
import { CommentType } from '../../types/CommentType';
import { CommentsProps } from '../../types/ComponentPropsType';

function Comments({
  comments,
  handleCommentClick,
  commentInputRef,
  handleCommentSubmit,
  isLimit,
  handleCommentsLoad,
}: CommentsProps) {
  return (
    <div className="comments">
      <div className="comments__header">
        <button
          type="button"
          className="comments__back-button transparent-button"
          onClick={handleCommentClick}
        >
          <MdArrowBack />
        </button>
        <form className="comments__form" onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="댓글 입력..."
            className="comments__input card"
            ref={commentInputRef}
          />
          <button type="submit" className="comments__submit card">
            입력
          </button>
        </form>
      </div>
      <div className="comments__content">
        {comments.map((comment: CommentType) => (
          <CommentContainer comment={comment} key={comment.id} />
        ))}
        {isLimit ? (
          <div className="comments__footer">모든 댓글을 확인했습니다.</div>
        ) : (
          <div
            className="comments__footer"
            role="presentation"
            onClick={handleCommentsLoad}
          >
            댓글 불러오기
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
