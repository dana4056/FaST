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
    // {
    //   id: 0,
    //   nickname: '',
    //   profile: '',
    //   content: '',
    //   regTime: '',
    //   isLike: false, // 좋아요 눌렀는지
    //   numLikes: 0, // 좋아요 개수
    // },
  ]);
  // 사용자가 이 댓글에 좋아요 표시를 했는지
  const [isLike, setIsLike] = useState<boolean>(comment.isLike);

  const { createCommentReply, getCommentReplies } = useViewModel();

  // 좋아요 클릭 함수
  const handleLikeClick = () => {
    setIsLike((prev: boolean) => !prev);
  };

  // 답글 작성칸 여는 함수
  const handleWriteOpenClick = () => {
    setIsWriteReplyOpen((prev: boolean) => !prev);
  };

  const getCommentRepliesData = async () => {
    const res = await getCommentReplies(comment.id, user.id, 20, 0);
    if (res.status === 200) {
      const newReplies: Array<ReplyType> = [];
      await Promise.all(
        res.data.map((item: any) =>
          newReplies.push({
            id: item.id,
            nickname: item.nickName,
            profile: 'profile/default',
            content: item.content,
            regTime: new Date(item.createTime).toDateString(),
            isLike: item.likeCheck,
            numLikes: 0,
          })
        )
      );
      setReplies([...newReplies]);
    }
  };
  // 답글 작성 함수
  const handleReplyChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReply(event.target.value);
  };

  // 답글 목록 여는 함수
  const handleVisibleRepliesClick = async () => {
    setIsVisibleReplies((prev: boolean) => !prev);
    await getCommentRepliesData();
  };

  // 작성한 답글 제출 함수
  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    // 이 자리에 api 함수 들어감
    const res = await createCommentReply(comment.id, reply, user.id);
    if (res.status === 200) {
      getCommentRepliesData();
    }
    // 작성 답글 초기화
    setReply('');
    setIsVisibleReplies(true);
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
