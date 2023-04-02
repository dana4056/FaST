import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CardDetailPage from '../pages/CardDetailPage';
import useArticleViewModel from '../viewmodels/ArticleViewModel';
import useCommentViewModel from '../viewmodels/CommentViewModel';

import { CommentType } from '../types/CommentType';
import { CardType } from '../types/CardType';
import { userInfo } from '../atoms/userInfo';

function CardDetailContainer() {
  const params = useParams();
  const navigate = useNavigate();
  const { getArticle, downloadImages } = useArticleViewModel();
  const { createComment, getComments } = useCommentViewModel();
  const user = useRecoilValue(userInfo);
  // 입력 댓글 input을 다루기 위한 ref
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [card, setCard] = useState<CardType>({
    content: '',
    id: 0,
    imageUrls: [],
    isLike: false,
    nickname: '',
    numComments: 0,
    numLikes: 0,
    regTime: '',
    tags: [],
    userId: 0,
  });
  // 메뉴가 열려있는지
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // 댓글창이 열려있는지
  const [isCommentOpen, setisCommentOpen] = useState<boolean>(false);
  // 댓글 배열
  const [comments, setComments] = useState<Array<CommentType>>([
    {
      id: 0,
      nickname: '',
      profile: '',
      content: '',
      regTime: '',
      isLike: false, // 좋아요 눌렀는지
      numLikes: 0, // 좋아요 개수
      numReplies: 0, // 답글 개수
    },
  ]);

  // 메뉴 토글 버튼 클릭 함수
  const handleMenuClick = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };
  // 댓글 버튼 클릭 함수
  const handleCommentClick = () => {
    setisCommentOpen((prev: boolean) => !prev);
  };

  // 좋아요 클릭 함수
  const handleLikeClick = () => {
    if (card) {
      setCard({
        ...card,
        isLike: !card.isLike,
      });
    }
  };

  const getCommentsData = async () => {
    if (params.cardId) {
      const res = await getComments(params.cardId, user.id, 10, 0);
      if (res.status === 200) {
        // console.log(res.data);
      }

      const newComments: Array<CommentType> = [];
      await Promise.all(
        res.data.map((comment: any) =>
          newComments.push({
            id: comment.id,
            nickname: comment.nickName,
            profile: 'profile/default.jpg',
            content: comment.content,
            regTime: new Date(comment.createTime).toDateString(),
            isLike: comment.likeCheck, // 좋아요 눌렀는지
            numLikes: 0, // 좋아요 개수
            numReplies: comment.commentReplyCount, // 답글 개수
          })
        )
      );
      setComments([...newComments]);
    }
  };

  // 댓글 전송 함수
  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (commentInputRef.current && params.cardId) {
      const res = await createComment(
        params.cardId,
        commentInputRef.current.value,
        user.id
      );
      if (res.status === 200) {
        getCommentsData();
      }
      commentInputRef.current.value = '';
    }
  };
  const handleModifyClick = () => {
    navigate(`/modify-article/${card.id}`);
  };
  const handleDeleteClick = () => {
    // test
  };
  useEffect(() => {
    const getArticleData = async () => {
      if (params.cardId) {
        const res = await getArticle(params.cardId, user.id);
        if (res.status === 200) {
          const imageUrls = await downloadImages(res.data.imgPath.split(','));
          const tags: any = [];
          res.data.tags.map((tag: any) =>
            tags.push({
              value: tag.tagName,
              className: 'tag-2',
            })
          );
          setCard({
            id: res.data.id,
            nickname: res.data.nickName,
            content: res.data.content,
            imageUrls,
            isLike: res.data.likeCheck,
            numLikes: res.data.likeCount,
            numComments: res.data.commentCount,
            regTime: new Date(res.data.createTime).toDateString(),
            tags,
            userId: res.data.userId,
          });
        }
      }
    };
    getArticleData();
    getCommentsData();
  }, []);

  return (
    <CardDetailPage
      card={card}
      user={user}
      comments={comments}
      handleLikeClick={handleLikeClick}
      isMenuOpen={isMenuOpen}
      handleMenuClick={handleMenuClick}
      isCommentOpen={isCommentOpen}
      handleCommentClick={handleCommentClick}
      commentInputRef={commentInputRef}
      handleCommentSubmit={handleCommentSubmit}
      handleModifyClick={handleModifyClick}
      handleDeleteClick={handleDeleteClick}
    />
  );
}

export default CardDetailContainer;
