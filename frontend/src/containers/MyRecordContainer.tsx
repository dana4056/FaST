import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';
import { storage } from '../utils/firebase';
import userApi from '../api/user';
import articleApi from '../api/article';

import MyRecordPage from '../pages/MyRecordPage';
import { TagType } from '../types/TagType';

import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import sample3 from '../assets/images/sample-images/sample_3.jpg';
import { CardType } from '../types/CardType';

import followApi from '../api/follow';

function MyRecordContainer() {
  const [user, setUser] = useRecoilState(userInfo);
  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});
  // 내 관심 태그
  const [myTag, setMyTag] = useState<any>([]);
  // 게시글 수
  const [articleNum, setArticleNum] = useState<number>(0);
  // 게시글 목록
  const [article, setArticle] = useState<any>({});

  useEffect(() => {
    // 프로필 박스
    const getData = async () => {
      const myData: any = await userApi.getMyData(user.id);
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
      const cntArticle: any = await userApi.countArticle(user.id);
      setArticleNum(cntArticle.data);

      // 게시글
      const articleData: any = await articleApi.getUserArticle(5, 20, 0);
      setArticle(articleData.data);
      console.log(article);
    };
    getData();
  }, []);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([]);

  useEffect(() => {
    const cardLeftList: any = [];
    const cardRightList: any = [];
    if (article.length > 0) {
      for (let i = article.length - 1; i >= 0; i -= 2) {
        const leftArticleTags: any = [];
        const leftItem = article[i];
        leftItem.tags.map((tag: any) =>
          leftArticleTags.push({
            value: tag.tagName,
            className: 'tag-2 tag-small',
          })
        );
        cardLeftList.push({
          id: leftItem?.id,
          // imageUrls: [leftItem?.imgPath],
          imageUrls: [sample1],
          nickname: leftItem?.nickname,
          content: '',
          regTime: leftItem?.createTime,
          isLike: leftItem?.likeCheck,
          numLikes: leftItem?.likeCount,
          numComments: leftItem?.commentCount,
          tags: leftArticleTags,
        });
      }
      for (let i = article.length - 2; i >= 0; i -= 2) {
        const rightArticleTags: any = [];
        const rightItem = article[i];
        rightItem.tags.map((tag: any) =>
          rightArticleTags.push({
            value: tag.tagName,
            className: 'tag-2 tag-small',
          })
        );
        cardRightList.push({
          id: rightItem?.id,
          // imageUrls: [rightItem?.imgPath],
          imageUrls: [sample1],
          nickname: rightItem?.nickname,
          content: '',
          regTime: rightItem?.createTime,
          isLike: rightItem?.likeCheck,
          numLikes: rightItem?.likeCount,
          numComments: rightItem?.commentCount,
          tags: rightArticleTags,
        });
      }
    }
    if (cardLeftList.length > 0) {
      setCardsLeft([...cardLeftList]);
    }
    if (cardRightList.length > 0) {
      setCardsRight([...cardRightList]);
    }
  }, [article]);

  // console.log(cardsLeft);

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    if (userData.imgPath?.substring(0, 4) === 'http') {
      setImageUrl(userData.imgPath);
    } else if (userData.imgPath) {
      const getProfileImage = async () => {
        const imageRef = ref(storage, userData.imgPath);
        const ret = await getDownloadURL(imageRef);
        setImageUrl(ret);
      };
      getProfileImage();
    }
  }, [userData.imgPath]);

  // 검색 키워드
  const [keyword, setKeyword] = useState<string>('');
  // 태그를 저장할 배열
  const [tags, setTags] = useState<Array<TagType>>([]);

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
      newTags.sort((o1: TagType, o2: TagType) => {
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

  // 팔로우 수 조회
  const [toId, setToId] = useState<number>(user.id);
  const [followerNum, setFollowerNum] = useState<number>(0);

  const [fromId, setFromId] = useState<number>(user.id);
  const [followingNum, setFollowingNum] = useState<number>(0);
  useEffect(() => {
    const getData = async () => {
      const followTo: any = await followApi.followTo(toId);
      setFollowerNum(followTo.data);

      const followFrom: any = await followApi.followFrom(fromId);
      setFollowingNum(followFrom.data);
    };

    getData();
  }, []);

  return (
    <MyRecordPage
      articleNum={articleNum}
      imageUrl={imageUrl}
      followerNum={followerNum}
      followingNum={followingNum}
      myTag={myTag}
      tags={tags}
      cardsLeft={cardsLeft}
      cardsRight={cardsRight}
      keyword={keyword}
      handleKeywordChange={handleKeywordChange}
      handleSearch={handleSearch}
      handleTagDelete={handleTagDelete}
    />
  );
}

export default MyRecordContainer;
