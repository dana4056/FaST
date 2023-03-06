import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

import { CommentProps } from '../../types/ComponentPropsType';

function Comment({
  comment,
  reply,
  handleReplyChange,
  replies,
  handleReplySubmit,
  isWriteReplyOpen,
  handleWriteOpenClick,
  isVisibleReplies,
  handleVisibleRepliesClick,
  isLike,
  handleLikeClick,
}: CommentProps) {
  return (
    <div className="comment card">
      <div className="comment__header">
        <div className="comment__profile-image">
          <RxAvatar />
        </div>
        <div className="comment__profile-nickname">{comment.nickname}</div>
        <div className="comment__reg-time">{comment.regTime}</div>
      </div>
      <div className="comment__content">
        {comment.content}
        <div className="comment__like">
          <button
            type="button"
            className="comment__heart transparent-button"
            onClick={handleLikeClick}
          >
            {isLike ? <FcLike /> : <FcLikePlaceholder />}
          </button>
          {comment.numLikes} Likes
        </div>
      </div>
      <div className="comment__footer">
        <button
          type="button"
          className="comment__button--write-reply transparent-button"
          onClick={handleWriteOpenClick}
        >
          답글 달기
        </button>
        <button
          type="button"
          className="comment__button--show-reply transparent-button"
          onClick={handleVisibleRepliesClick}
        >
          답글 {comment.numReplies}개 보기
        </button>
      </div>
      <form
        className="comment__form-reply"
        onSubmit={handleReplySubmit}
        style={
          isWriteReplyOpen
            ? {
                height: '40px',
                border: '',
              }
            : {
                height: '0px',
                border: 'none',
              }
        }
      >
        <input
          type="text"
          placeholder="답글 달기..."
          className="comment__input-reply"
          value={reply}
          onChange={handleReplyChange}
        />
        <button type="submit" className="comment__submit-reply">
          작성
        </button>
      </form>
      <div
        className="comment__replies"
        style={
          isVisibleReplies
            ? {
                maxHeight: '1000px',
                transition: 'max-height 0.4s ease-in-out',
              }
            : {
                maxHeight: '0',
              }
        }
      >
        {replies.map((item: any) => (
          <div className="comment__reply" key={item.id}>
            <div className="comment__reply-header">
              <div className="comment__reply-profile">
                <RxAvatar />
              </div>
              <div className="comment__reply-nickname">{item.nickname}</div>
              <div className="comment__reply-reg-time">{item.regTime}</div>
            </div>
            <div className="comment__reply-content">
              <div className="comment__reply-reply">{item.content}</div>
              <div className="comment__reply-like">
                <button
                  type="button"
                  className="comment__reply-heart transparent-button"
                >
                  {item.isLike ? <FcLike /> : <FcLikePlaceholder />}
                </button>
                <div className="comment__reply-num-likes">
                  {item.numLikes} Likes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
