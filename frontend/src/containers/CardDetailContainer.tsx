import React, { useState, useEffect } from 'react';

import CardDetailPage from '../pages/CardDetailPage';
import { TagType } from '../types/TagType';

import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import sample3 from '../assets/images/sample-images/sample_3.jpg';
import { CommentType } from '../types/CommentType';
import { CardType } from '../types/CardType';

function CardDetailContainer() {
  const [card, setCard] = useState<CardType>({
    id: 1,
    nickname: 'abcd1234',
    content: '샘플 카드',
    imageUrls: [sample1, sample2, sample3],
    isLike: false,
    numLikes: 123,
    numComments: 12,
    regTime: new Date().toDateString(),
    tags: [
      {
        value: 'sample1',
        className: 'tag-2',
      },
    ],
  });
  // 메뉴가 열려있는지
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // 댓글창이 열려있는지
  const [isCommentOpen, setisCommentOpen] = useState<boolean>(false);
  // 댓글 배열
  const [comments, setComments] = useState<Array<CommentType>>([
    {
      id: 1,
      nickname: '샘플 닉네임',
      profile: '프로필이미지',
      content: '샘플 댓글 내용',
      regTime: '작성날짜',
      isLike: true, // 좋아요 눌렀는지
      numLikes: 123, // 좋아요 개수
      numReplies: 12, // 답글 개수
    },
    {
      id: 2,
      nickname: '샘플 닉네임 2',
      profile: '프로필 이미지2',
      content: '샘플 댓글 내용',
      regTime: '작성 날짜 2',
      isLike: false,
      numLikes: 11,
      numReplies: 13,
    },
  ]);
  // 이미지 경로 배열
  const [imageUrls, setImageUrls] = useState<Array<string>>([
    sample1,
    sample2,
    sample3,
  ]);
  // 태그 배열
  const [tags, setTags] = useState<Array<TagType>>([
    {
      className: 'tag-1',
      value: 'sample tag',
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
    setCard({
      ...card,
      isLike: !card.isLike,
    });
  };

  return (
    <CardDetailPage
      card={card}
      comments={comments}
      handleLikeClick={handleLikeClick}
      isMenuOpen={isMenuOpen}
      handleMenuClick={handleMenuClick}
      isCommentOpen={isCommentOpen}
      handleCommentClick={handleCommentClick}
    />
  );
}

export default CardDetailContainer;
