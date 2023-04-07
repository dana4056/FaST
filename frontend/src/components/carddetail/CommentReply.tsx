import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BsPerson } from '@react-icons/all-files/bs/BsPerson';
import { userInfo } from '../../atoms/userInfo';
import Heart from '../Heart';
import useViewModel from '../../viewmodels/CommentViewModel';
import { CommentProps } from '../../types/ComponentPropsType';

function CommentReply({ commentReply, handleRepliesReload }: any) {
  const [user, setUser] = useRecoilState(userInfo);
  const [isMine, setIsMine] = useState<boolean>(false);
  const { deleteReply, updateReply } = useViewModel();
  useEffect(() => {
    if (user.id === commentReply.userId) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [commentReply.userId, user.id]);

  // 답글 삭제 함수
  const deleteReplyData = async () => {
    const res: any = await deleteReply(commentReply.id, user.id);
    if (res.status === 200) {
      handleRepliesReload();
    }
  };
  const handleDeleteReply = async (event: React.MouseEvent) => {
    event.preventDefault();
    deleteReplyData();
  };
  // // 답글 수정칸 여는 함수
  const [openUpdateReply, setOpenUpdateReply] = useState<boolean>(false);
  const handleUpdateReplyOpenClick = () => {
    setOpenUpdateReply((prev: boolean) => !prev);
  };
  // // 답글 입력 감지 함수
  const [replyContent, setReplyContent] = useState<string>(
    commentReply.content
  );
  const onChangeReply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent(event.currentTarget.value);
  };
  // // 답글 수정 함수
  const updateReplyData = async () => {
    const res = await updateReply(commentReply.id, replyContent, user.id);
    return res;
  };
  const handleUpdateReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateReplyData();
    setOpenUpdateReply(false);
  };
  return (
    <div className="comment__reply">
      <div className="comment__reply-header">
        <div className="comment__reply-profile">
          <BsPerson />
        </div>
        <div className="comment__reply-nickname">{commentReply.nickname}</div>
        <div className="comment__reply-reg-time">{commentReply.regTime}</div>
        {isMine ? (
          <>
            <div
              className="comment__reply-update-btn"
              onClick={handleUpdateReplyOpenClick}
              role="presentation"
            >
              수정
            </div>
            <div
              className="comment__reply-delete-btn"
              onClick={handleDeleteReply}
              role="presentation"
            >
              삭제
            </div>
          </>
        ) : null}
      </div>
      <div className="comment__reply-content">
        {openUpdateReply ? (
          <form
            className="comment__reply-update-box"
            onSubmit={handleUpdateReply}
          >
            <input
              type="text"
              defaultValue={replyContent}
              onChange={onChangeReply}
              className="comment__reply-update-input"
            />
            <button type="submit" className="comment__reply-update-btn card">
              저장
            </button>
          </form>
        ) : (
          <div className="comment__reply-text">{replyContent}</div>
        )}
        <div className="comment__reply-like">
          <Heart
            cardId={commentReply.id}
            cntLike={commentReply.numLikes}
            isLike={commentReply.isLike}
            type="commentReply"
          />
        </div>
      </div>
    </div>
  );
}

export default CommentReply;
