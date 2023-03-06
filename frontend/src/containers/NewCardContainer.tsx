import React, { useState, useEffect } from 'react';

import NewCardPage from '../pages/NewCardPage';
import { TagType } from '../types/TagType';

function NewCardContainer() {
  // 미리보기 이미지 url 저장 배열
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  // 이미지 파일 저장 배열
  const [images, setImages] = useState<Array<File>>([]);
  // 태그 저장 배열
  const [tags, setTags] = useState<Array<TagType>>([]);
  // 카드 내용
  const [description, setDescription] = useState<string>('');

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
      setImages((prev: Array<File>) => [...prev.concat(newImages)]);
      setImageUrls((prev: Array<string>) => [...prev.concat(newImageUrls)]);

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign

      // 샘플 태그
      setTags([
        {
          value: '테스트태그',
          className: 'tag-1',
        },
      ]);
    }
  };

  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrls([]);
    setImages([]);
    setTags([]);
  };

  // 내용 변화를 감지
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  // 카드 생성 함수
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();
    // 서버에 업로드하는 함수는 여기에
  };

  return (
    <NewCardPage
      imageUrls={imageUrls}
      handleImageChange={handleImageChange}
      handleImageDelete={handleImageDelete}
      tags={tags}
      description={description}
      handleDescriptionChange={handleDescriptionChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default NewCardContainer;
