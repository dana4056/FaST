import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BsPerson } from '@react-icons/all-files/bs/BsPerson';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcLikePlaceholder } from '@react-icons/all-files/fc/FcLikePlaceholder';
import { userInfo } from '../../atoms/userInfo';
import Heart from '../Heart';
import CommentReply from './CommentReply';
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
  profile,
  handleDeleteComment,
  openUpdateComment,
  commentContent,
  handleUpdateCommentOpenClick,
  onChangeComment,
  handleUpdateComment,
}: CommentProps) {
  const [user, setUser] = useRecoilState(userInfo);
  const [isMine, setIsMine] = useState<boolean>(false);
  useEffect(() => {
    if (user.id === comment.userId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [comment.userId, user.id]);
  return (
    <div className="comment card">
      <div className="comment__header">
        <div className="comment__profile-image">
          <img src={profile} alt="" />
        </div>
        <div className="comment__profile-nickname">{comment.nickname}</div>
        <div className="comment__reg-time">{comment.regTime}</div>
        {isMine ? (
          <>
            <div
              className="comment__update-btn"
              onClick={handleUpdateCommentOpenClick}
              role="presentation"
            >
              수정
            </div>
            <div
              className="comment__delete-btn"
              onClick={handleDeleteComment}
              role="presentation"
            >
              삭제
            </div>
          </>
        ) : null}
      </div>
      <div className="comment__content">
        {openUpdateComment ? (
          <div className="comment__update-box">
            <input
              type="text"
              defaultValue={commentContent}
              onChange={onChangeComment}
              className="comment__update-input"
            />
            <button
              type="button"
              className="comment__update-btn card"
              onClick={handleUpdateComment}
            >
              저장
            </button>
          </div>
        ) : (
          <div className="comment__text">{commentContent}</div>
        )}
        <div className="comment__like">
          <Heart
            cardId={comment.id}
            cntLike={comment.numLikes}
            isLike={comment.isLike}
            type="comment"
          />
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
        {replies.map((commentReply: any) => (
          <CommentReply commentReply={commentReply} key={commentReply.id} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
