import React, { useState, useEffect, useRef } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';
import { storage } from '../utils/firebase';
import { userInfo } from '../atoms/userInfo';
import userApi from '../api/user';
import articleApi from '../api/article';

import MyRecordPage from '../pages/MyRecordPage';
import { TagType } from '../types/TagType';

import { CardType } from '../types/CardType';
import useViewModel from '../viewmodels/ArticleViewModel';
import followApi from '../api/follow';
import useIntersect from '../utils/useIntersect';

// import sample1 from '../assets/images/sample-images/sample_1.jpg';

function MyRecordContainer() {
  const size = 10;
  const params = useParams();
  const location = useLocation();
  const [user, setUser] = useRecoilState(userInfo);
  const [userState, setUserState] = useState<any>(params.userId);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLimit, setIsLimit] = useState<boolean>(false);
  const pageEnd = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});
  // 내 관심 태그
  const [myTag, setMyTag] = useState<any>([]);
  // 게시글 수
  const [articleNum, setArticleNum] = useState<number>(0);

  const [load, setLoad] = useState<boolean>(false);

  const { downloadImages, getMyArticles } = useViewModel();

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    if (userData.imgPath?.substring(0, 4) === 'http') {
      setImageUrl(userData.imgPath);
    } else if (userData.imgPath) {
      const getProfileImage = async () => {
        // const imageRef = ref(storage, userData.imgPath);
        const ret = await downloadImages([userData.imgPath]);
        setImageUrl(ret[0]);
      };
      getProfileImage();
    }
  }, [userData.imgPath]);

  const [nickname, setNickname] = useState<string>('');
  useEffect(() => {
    setNickname(userData.nickname);
  }, [userData]);

  // 팔로우 수 조회
  const [toId, setToId] = useState<number>(userState);
  const [followerNum, setFollowerNum] = useState<number>(0);

  const [fromId, setFromId] = useState<number>(userState);
  const [followingNum, setFollowingNum] = useState<number>(0);

  const getArticleData = async () => {
    setLoading(true);
    if (!isLimit) {
      setIsLoaded(true);

      const res: any = await getMyArticles(userState, user.id, size, offset);
      if (res.status === 200) {
        const cardLeftList: any = cardsLeft;
        const cardRightList: any = cardsRight;
        if (res.data.length > 0) {
          await Promise.all(
            res.data.map(async (article: any, i: number) => {
              if (i % 2 === 0) {
                const leftArticleTags: any = [];
                article.tags.map((tag: any) =>
                  leftArticleTags.push({
                    value: tag.tagName,
                    className: 'tag-2 tag-small',
                  })
                );
                const imageUrls = await downloadImages(
                  article.imgPath.split(',')
                );
                cardLeftList.push({
                  id: article?.id,
                  imageUrls,
                  nickname: article.nickname,
                  content: '',
                  regTime: article?.createTime,
                  isLike: article?.likeCheck,
                  numLikes: article?.likeCount,
                  numComments: article?.commentCount,
                  tags: leftArticleTags,
                });
              } else {
                const rightArticleTags: any = [];
                await Promise.all(
                  article.tags.map((tag: any) =>
                    rightArticleTags.push({
                      value: tag.tagName,
                      className: 'tag-2 tag-small',
                    })
                  )
                );
                const imageUrls = await downloadImages(
                  article.imgPath.split(',')
                );
                cardRightList.push({
                  id: article?.id,
                  imageUrls,
                  nickname: article.nickname,
                  content: '',
                  regTime: article?.createTime,
                  isLike: article?.likeCheck,
                  numLikes: article?.likeCount,
                  numComments: article?.commentCount,
                  tags: rightArticleTags,
                });
              }
            })
          );
          if (cardLeftList.length > 0) {
            setCardsLeft([
              ...cardsLeft.sort((o1: any, o2: any) => o2.id - o1.id),
            ]);
          }
          if (cardRightList.length > 0) {
            setCardsRight([
              ...cardsRight.sort((o1: any, o2: any) => o2.id - o1.id),
            ]);
          }
        } else {
          setIsLimit(true);
        }
      } else {
        setIsLimit(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user.id.toString() === userState.toString()) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
    // 프로필 박스
    const getData = async () => {
      const myData: any = await userApi.getMyData(userState);
      setUserData(myData.data);
      const newMyTag: Array<TagType> = [];
      myData.data.tags.map((tag: any) =>
        newMyTag.push({
          className: `tag-${Math.floor(Math.random() * 4) + 1}`,
          value: tag.tagName,
        })
      );
      setMyTag(newMyTag);

      // 프로필 박스 - 기록수
      const cntArticle: any = await userApi.countArticle(userState);
      setArticleNum(cntArticle.data);
    };
    getData();
  }, [userState]);

  useEffect(() => {
    setUserState(params.userId);
    setCardsLeft([]);
    setCardsRight([]);
    setIsLimit(false);
    setOffset(0);
    setLoad((prev: boolean) => !prev);
  }, [location.pathname]);

  useEffect(() => {
    const getData = async () => {
      const followTo: any = await followApi.followTo(toId);
      setFollowerNum(followTo.data);

      const followFrom: any = await followApi.followFrom(fromId);
      setFollowingNum(followFrom.data);
    };

    getData();
  }, [userState]);

  useEffect(() => {
    getArticleData();
  }, [load]);

  const loadMore = () => {
    setOffset((prev: number) => prev + 1);
    setLoad((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (!pageEnd.current) return;
    const observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && !loading && !isLimit) {
        loadMore();
      }
    });
    observer.observe(pageEnd.current);
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, [pageEnd, isLimit, loading]);

  return (
    <MyRecordPage
      isMine={isMine}
      nickname={nickname}
      articleNum={articleNum}
      imageUrl={imageUrl}
      followerNum={followerNum}
      followingNum={followingNum}
      myTag={myTag}
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      isLoaded={isLoaded}
      isLimit={isLimit}
      pageEnd={pageEnd}
    />
  );
}

export default MyRecordContainer;
