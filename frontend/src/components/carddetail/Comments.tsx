import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

import CommentContainer from '../../containers/CommentContainer';
import { CommentType } from '../../types/CommentType';
import { CommentsProps } from '../../types/ComponentPropsType';

function Comments({ comments, handleCommentClick }: CommentsProps) {
  return (
    <div className="comments">
      <div className="comments__header">
        <button
          type="button"
          className="comments__back-button transparent-button"
          onClick={handleCommentClick}
        >
          <MdArrowBackIosNew />
        </button>
      </div>
      {comments.map((comment: CommentType) => (
        <CommentContainer comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default Comments;
