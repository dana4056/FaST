import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atoms/userInfo';

import Comment from '../components/carddetail/Comment';
import { CommentContinaerProps } from '../types/ComponentPropsType';
import { ReplyType } from '../types/ReplyType';

import useViewModel from '../viewmodels/CommentViewModel';

function CommentContainer({ comment }: CommentContinaerProps) {
  const user = useRecoilValue(userInfo);
  // 현재 작성 중인 답글
  const [reply, setReply] = useState<string>('');
  // 답글 작성칸이 열려있는지
  const [isWriteReplyOpen, setIsWriteReplyOpen] = useState<boolean>(false);
  // 답글이 보이는지
  const [isVisibleReplies, setIsVisibleReplies] = useState<boolean>(false);
  // 답글 목록
  const [replies, setReplies] = useState<Array<ReplyType>>([
    {
      id: 1,
      nickname: '샘플 닉네임',
      profile: '프로필이미지',
      content: '샘플 댓글 내용',
      regTime: '작성날짜',
      isLike: true, // 좋아요 눌렀는지
      numLikes: 123, // 좋아요 개수
    },
  ]);
  // 사용자가 이 댓글에 좋아요 표시를 했는지
  const [isLike, setIsLike] = useState<boolean>(comment.isLike);

  const { createCommentReply } = useViewModel();

  // 좋아요 클릭 함수
  const handleLikeClick = () => {
    setIsLike((prev: boolean) => !prev);
  };

  // 답글 작성 함수
  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReply(event.target.value);
  };

  // 답글 작성칸 여는 함수
  const handleWriteOpenClick = () => {
    setIsWriteReplyOpen((prev: boolean) => !prev);
  };

  // 답글 목록 여는 함수
  const handleVisibleRepliesClick = () => {
    setIsVisibleReplies((prev: boolean) => !prev);
  };

  // 작성한 답글 제출 함수
  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    // 이 자리에 api 함수 들어감
    console.log(comment.id, reply, user.id);
    const res = await createCommentReply(comment.id, reply, user.id);
    console.log(res);

    // 작성 답글 초기화
    setReply('');
  };
  return (
    <Comment
      comment={comment}
      reply={reply}
      handleReplyChange={handleReplyChange}
      handleReplySubmit={handleReplySubmit}
      replies={replies}
      isWriteReplyOpen={isWriteReplyOpen}
      handleWriteOpenClick={handleWriteOpenClick}
      isVisibleReplies={isVisibleReplies}
      handleVisibleRepliesClick={handleVisibleRepliesClick}
      isLike={isLike}
      handleLikeClick={handleLikeClick}
    />
  );
}

export default CommentContainer;
