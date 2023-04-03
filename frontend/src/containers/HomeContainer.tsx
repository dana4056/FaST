import React, { useState, useEffect } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';
import HomePage from '../pages/HomePage';
import { TagType } from '../types/TagType';
import { CardType } from '../types/CardType';
import useViewModel from '../viewmodels/ArticleViewModel';

// ViewModel과 View를 연결하기 위한 Container
function HomeContainer() {
  const [user, setUser] = useRecoilState(userInfo);
  const [isMine, setIsMine] = useState<boolean>(true);

  // 검색 키워드
  const [keyword, setKeyword] = useState<string>('');
  // 태그를 저장할 배열
  const [tags, setTags] = useState<Array<TagType>>([]);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  const { getArticles, downloadImages } = useViewModel();

  // 검색 함수
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    // 전에 검색하지 않은 키워드만 검색하도록 index를 찾음
    const index = tags.findIndex((tag: TagType) => keyword === tag.value);

    // 빈 문자열이 아니고 없는 키워드일 경우 검색
    if (keyword.trim().length !== 0 && index === -1) {
      // 배열에 추가
      const newTags = tags;
      newTags.push({
        className: `tag-${Math.floor(Math.random() * 4) + 1}`,
        value: keyword,
      });

      // 검색 api 호출은 여기 들어가면 될 듯

      // 태그 길이 오름차순 정렬
      newTags.sort((o1: any, o2: any) => {
        return o1.value.length - o2.value.length;
      });
      setTags([...newTags]);
    }

    // 검색창 초기화
    setKeyword('');
  };

  // 입력창 변화를 감지할 함수
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  // 태그 삭제 함수
  const handleTagDelete = (value: string) => {
    // 해당 태그의 인덱스를 찾음
    const index = tags.findIndex((tag: TagType) => value === tag.value);
    if (index > -1) {
      // 해당 인덱스의 태그 삭제
      const newTags = tags;
      newTags.splice(index, 1);

      // 삭제했을 경우 지운 뒤의 태그들로 다시 검색

      setTags([...newTags]);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res: any = await getArticles(user.id, 3, 0);
      if (res.status === 200) {
        const cardLeftList: any = [];
        const cardRightList: any = [];
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
                  isLike: article?.isLike,
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
                  isLike: article?.isLike,
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
      }
    };
    getData();
  }, []);

  return (
    <HomePage
      isMine={isMine}
      tags={tags}
      keyword={keyword}
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      handleKeywordChange={handleKeywordChange}
      handleSearch={handleSearch}
      handleTagDelete={handleTagDelete}
    />
  );
}

export default HomeContainer;
