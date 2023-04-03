import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';
import MapPage from '../pages/MapPage';
import { CardType } from '../types/CardType';
import useViewModel from '../viewmodels/ArticleViewModel';
import articleApi from '../api/article';

function MapContainer() {
  const [user, setUser] = useRecoilState(userInfo);

  const [isMine, setIsMine] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { downloadImages } = useViewModel();
  const area = '서울특별시';
  const size = 20;
  const offset = 0;

  const [articleData, setArticleData] = useState<any>();
  useEffect(() => {
    const getData = async () => {
      // 지역 기반 데이터 조회
      const mapData: any = await articleApi.getMapArticle(
        user.id,
        size,
        offset,
        area
      );
      setArticleData(mapData.data);
    };
    getData();
  }, []);

  console.log(articleData);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  useEffect(() => {
    const setData = async () => {
      const cardLeftList: any = [];
      const cardRightList: any = [];
      if (articleData.length > 0) {
        await Promise.all(
          articleData.map(async (article: any, i: number) => {
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
                nickname: article?.nickName,
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
                nickname: article?.nickName,
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
      }
      if (cardLeftList.length > 0) {
        setCardsLeft([
          ...cardLeftList.sort((o1: any, o2: any) => o2.id - o1.id),
        ]);
      }
      if (cardRightList.length > 0) {
        setCardsRight([
          ...cardRightList.sort((o1: any, o2: any) => o2.id - o1.id),
        ]);
      }
    };
    setData();
  }, [articleData]);

  return (
    <MapPage
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      isMine={isMine}
      scrollRef={scrollRef}
    />
  );
}

export default MapContainer;
