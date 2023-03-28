import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../utils/firebase';
import modifyApi from '../api/modify';

import MyRecordPage from '../pages/MyRecordPage';
import { TagType } from '../types/TagType';

import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import sample3 from '../assets/images/sample-images/sample_3.jpg';
import { CardType } from '../types/CardType';

import followApi from '../api/follow';

function MyRecordContainer() {
  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});
  // 내 관심 태그
  const [myTag, setMyTag] = useState<any>([]);
  useEffect(() => {
    const getData = async () => {
      const myData: any = await modifyApi.getMyData(8);
      setUserData(myData.data);
      setMyTag(myData.data.tags);
      const newMyTag: Array<TagType> = [];
      myData.data.tags.map((tag: any) =>
        newMyTag.push({
          className: `tag-${Math.floor(Math.random() * 4) + 1}`,
          value: tag.tagName,
        })
      );
      setMyTag(newMyTag);
    };
    getData();
  }, []);
  console.log(myTag);

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    // if (userData.imgPath.substring(0, 4) === 'http') {
    //   setImageUrl(userData.imgPath);
    // } else {
    const getProfileImage = async () => {
      const imageRef = ref(storage, userData.imgPath);
      const ret = await getDownloadURL(imageRef);
      setImageUrl(ret);
    };
    getProfileImage();
    // }
  }, [userData.imgPath]);

  // 검색 키워드
  const [keyword, setKeyword] = useState<string>('');
  // 태그를 저장할 배열
  const [tags, setTags] = useState<Array<TagType>>([]);

  const [cardsLeft, setCardsLeft] = useState<Array<CardType>>([
    {
      id: 3,
      imageUrls: [sample1],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
    {
      id: 4,
      imageUrls: [sample2],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
  ]);
  const [cardsRight, setCardsRight] = useState<Array<CardType>>([
    {
      id: 5,
      imageUrls: [sample3],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
    {
      id: 6,
      imageUrls: [sample1],
      nickname: 'abcd1234',
      content: '샘플1',
      regTime: '지금',
      isLike: false,
      numLikes: 123,
      numComments: 12,
      tags: [
        {
          value: 'sample1',
          className: 'tag-2 tag-small',
        },
        {
          value: 'sample2',
          className: 'tag-2 tag-small',
        },
      ],
    },
  ]);

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
  const [toId, setToId] = useState<number>(2);
  const [followerNum, setFollowerNum] = useState<number>(0);

  const [fromId, setFromId] = useState<number>(2);
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
