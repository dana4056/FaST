import React, { useState, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';

import { HeartProps } from '../types/ComponentPropsType';
import articleApi from '../api/article';
import { commentLike, commentReplyLike } from '../api/comment';

function Heart({ cardId, cntLike, isLike, type }: HeartProps) {
  const [user, setUser] = useRecoilState(userInfo);
  // 좋아요 버튼 누르는 것
  const [liked, setLiked] = useState<boolean>();
  // 좋아요 수
  const [likeNum, setLikeNum] = useState<number>(cntLike);
  // 현재 좋아요 상태
  const [likeState, setLikeState] = useState<boolean>(isLike);

  const likeData = async () => {
    if (type === 'article') {
      const articleLikeData: any = await articleApi.articleLike(
        cardId,
        user.id
      );
      if (articleLikeData.status === 200) {
        setLiked(articleLikeData.data);
      }
    } else if (type === 'comment') {
      const commentLikeData: any = await commentLike(cardId, user.id);
      console.log(cardId, user.id);
      if (commentLikeData.status === 200) {
        setLiked(commentLikeData.data);
      }
    } else if (type === 'commentReply') {
      const commentReplyLikeData: any = await commentReplyLike(cardId, user.id);
      console.log(cardId, user.id);
      console.log(commentReplyLikeData);
      if (commentReplyLikeData.status === 200) {
        setLiked(commentReplyLikeData.data);
      }
    }
  };
  const handleLikeClick = (event: any) => {
    event.stopPropagation();
    likeData();
  };

  useEffect(() => {
    setLikeNum(cntLike);
  }, [cntLike]);

  useEffect(() => {
    if (liked !== undefined) {
      if (liked) {
        setLikeNum((prev) => prev + 1);
        setLikeState(true);
      } else {
        setLikeNum((prev) => prev - 1);
        setLikeState(false);
      }
    }
  }, [liked]);

  useMemo(() => {
    setLikeState(isLike);
  }, [isLike]);
  // useEffect(() => {
  //   if (liked !== undefined) {
  //     setLikeState(liked);
  //   }
  // }, [liked]);

  return (
    <div role="presentation" onClick={handleLikeClick}>
      <div className="like-button-container">
        <button
          className={`like-button ${likeState ? ' liked' : ' unliked'}`}
          type="button"
        >
          <div className="like-wrapper">
            <svg
              className="heart liked"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
            <div
              className="particles"
              style={{ '--total-particles': 6 } as React.CSSProperties}
            >
              <div
                className="particle"
                style={
                  { '--i': 1, '--color': '#7642F0' } as React.CSSProperties
                }
              />
              <div
                className="particle"
                style={
                  { '--i': 2, '--color': '#AFD27F' } as React.CSSProperties
                }
              />
              <div
                className="particle"
                style={
                  { '--i': 3, '--color': '#DE8F4F' } as React.CSSProperties
                }
              />
              <div
                className="particle"
                style={
                  { '--i': 4, '--color': '#D0516B' } as React.CSSProperties
                }
              />
              <div
                className="particle"
                style={
                  { '--i': 5, '--color': '#5686F2' } as React.CSSProperties
                }
              />
              <div
                className="particle"
                style={
                  { '--i': 6, '--color': '#D53EF3' } as React.CSSProperties
                }
              />
            </div>
          </div>
        </button>
        <span className="cnt__article-like">{likeNum} Likes </span>
      </div>
    </div>
  );
}

export default Heart;
