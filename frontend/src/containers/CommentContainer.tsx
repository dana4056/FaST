import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atoms/userInfo';

import Comment from '../components/carddetail/Comment';
import { CommentContainerProps } from '../types/ComponentPropsType';
import { ReplyType } from '../types/ReplyType';

import useViewModel from '../viewmodels/CommentViewModel';
import useArticleViewModel from '../viewmodels/ArticleViewModel';

function CommentContainer({
  comment,
  handleCommentDelete,
}: CommentContainerProps) {
  const user = useRecoilValue(userInfo);
  // 현재 작성 중인 답글
  const [reply, setReply] = useState<string>('');
  // 답글 작성칸이 열려있는지
  const [isWriteReplyOpen, setIsWriteReplyOpen] = useState<boolean>(false);
  // 답글이 보이는지
  const [isVisibleReplies, setIsVisibleReplies] = useState<boolean>(false);
  const [profile, setProfile] = useState<string>('');
  const [replyOffset, setReplyOffset] = useState<number>(0);
  const [isLimit, setIsLimit] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  // 답글 목록
  const [replies, setReplies] = useState<Array<ReplyType>>([]);
  // 사용자가 이 댓글에 좋아요 표시를 했는지
  const [isLike, setIsLike] = useState<boolean>(comment.isLike);
  const {
    deleteComment,
    updateComment,
    createCommentReply,
    getCommentReplies,
  } = useViewModel();
  const { downloadImages } = useArticleViewModel();

  // 좋아요 클릭 함수
  const handleLikeClick = () => {
    setIsLike((prev: boolean) => !prev);
  };

  const handleDeleteComment = async () => {
    const res: any = await deleteComment(comment.id, user.id);
    if (res.status === 200) {
      handleCommentDelete();
    }
  };

  // 댓글 수정칸 여는 함수
  const [openUpdateComment, setOpenUpdateComment] = useState<boolean>(false);
  const handleUpdateCommentOpenClick = () => {
    setOpenUpdateComment((prev: boolean) => !prev);
  };
  // 댓글 입력 감지 함수
  const [commentContent, setCommentContent] = useState<string>(comment.content);
  const onChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(event.currentTarget.value);
  };
  // 댓글 수정 함수
  const updateCommentData = async () => {
    const res = await updateComment(comment.id, commentContent, user.id);
    return res;
  };
  const handleUpdateComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    updateCommentData();
    setOpenUpdateComment(false);
  };

  // 답글 작성칸 여는 함수
  const handleWriteOpenClick = () => {
    setIsWriteReplyOpen((prev: boolean) => !prev);
  };

  const getCommentRepliesData = async () => {
    const res = await getCommentReplies(comment.id, user.id, 3, replyOffset);
    if (res.status === 200) {
      if (res.data.length > 0) {
        const newReplies: Array<ReplyType> = replies;
        await Promise.all(
          res.data.map((item: any) =>
            newReplies.push({
              id: item.id,
              userId: item.userId,
              nickname: item.nickName,
              profile: 'profile/default',
              content: item.content,
              regTime: new Date(item.createTime).toLocaleDateString(),
              isLike: item.likeCheck,
              numLikes: item.likeCount,
            })
          )
        );
        newReplies.sort((o1: ReplyType, o2: ReplyType) => o2.id - o1.id);
        setReplies([...newReplies]);
      } else {
        setIsLimit(true);
      }
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
  };

  // 작성한 답글 제출 함수
  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    // 이 자리에 api 함수 들어감
    const res = await createCommentReply(comment.id, reply, user.id);
    if (res.status === 200) {
      setReplies([]);
      setReplyOffset(0);
      setIsLimit(false);
      setLoad((prev: boolean) => !prev);
    }
    // 작성 답글 초기화
    setReply('');
    setIsVisibleReplies(true);
  };

  const handleRepliesLoad = () => {
    setReplyOffset((prev: number) => prev + 1);
    setLoad((prev: boolean) => !prev);
  };

  const handleRepliesReload = () => {
    setReplies([]);
    setReplyOffset(0);
    setIsLimit(false);
    setLoad((prev: boolean) => !prev);
  };

  useEffect(() => {
    const getData = async () => {
      if (comment.profile) {
        const res = await downloadImages([comment.profile]);
        setProfile(res[0]);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    getCommentRepliesData();
  }, [load]);
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
      profile={profile}
      handleDeleteComment={handleDeleteComment}
      openUpdateComment={openUpdateComment}
      commentContent={commentContent}
      handleUpdateCommentOpenClick={handleUpdateCommentOpenClick}
      onChangeComment={onChangeComment}
      handleUpdateComment={handleUpdateComment}
      isLimit={isLimit}
      handleRepliesLoad={handleRepliesLoad}
      handleRepliesReload={handleRepliesReload}
    />
  );
}

export default CommentContainer;
