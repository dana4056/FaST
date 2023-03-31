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
      </div>
    </div>
  );
}

export default Comments;
