import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import UserModifyPage from '../pages/UserModifyPage';
import { TagType } from '../types/TagType';
import modifyApi from '../api/modify';
import { storage } from '../utils/firebase';

function UserModifyContainer() {
  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const myData: any = await modifyApi.getMyData(8);
      setUserData(myData.data);
    };
    getData();
  }, []);
  console.log(userData);

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

  // 이미지 파일 저장 배열
  const [image, setImage] = useState<File>();
  // 이미지 입력
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const { files } = event.target;
      const newImages: Array<File> = [];
      const newImageUrls: Array<string> = [];

      // 입력한 파일을 순회하며 state에 추가
      for (let i = 0; i < files.length; i += 1) {
        newImages[i] = files[i];
        newImageUrls[i] = URL.createObjectURL(files[i]);
      }
      setImage(newImages[0]);
      setImageUrl(newImageUrls[0]);

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };
  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrl('');
    setImage(undefined);
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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
  return (
    <div>
      <UserModifyPage
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        name={userData.nickname}
        email={userData.email}
        tags={tags}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        handleSearch={handleSearch}
        handleTagDelete={handleTagDelete}
      />
    </div>
  );
}

export default UserModifyContainer;
