import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import UserModifyPage from '../pages/UserModifyPage';
import Modal from '../components/Modal';
import { userInfo } from '../atoms/userInfo';
import { TagType } from '../types/TagType';
import modifyApi from '../api/user';
import imageApi from '../api/image';
import useViewModel from '../viewmodels/ArticleViewModel';
import { storage } from '../utils/firebase';
import sample1 from '../assets/images/sample-images/sample_1.jpg';

function UserModifyContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  const { downloadImages, uploadImages, deleteImage } = useViewModel();
  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    const getData = async () => {
      const myData: any = await modifyApi.getMyData(user.id);
      const imagePath = await downloadImages([myData.data.imgPath]);
      setImageUrl(imagePath[0]);

      setUserData(myData.data);
    };
    getData();
  }, []);
  const [imgPath, setImgPath] = useState<string>('profiles/default.jpg');
  useEffect(() => {
    if (userData.imgPath?.substring(0, 4) === 'http') {
      setImageUrl(userData.imgPath);
      setImgPath(imageUrl);
    } else if (userData.imgPath) {
      const getProfileImage = async () => {
        const image = await downloadImages([userData.imgPath]);
        setImageUrl(image[0]);
        setImgPath(`profiles/${userData.email}`);
      };
      getProfileImage();
    }
  }, [userData.imgPath]);

  // 이미지 파일 저장 배열
  const [image, setImage] = useState<File>();
  // 이미지 입력
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const { files } = event.target;
      const options = {
        maxSizeMB: 0.2,
        maxWidthORHeight: 640,
        useWebWorker: true,
      };
      try {
        const compressedImage = await imageCompression(files[0], options);
        setImage(compressedImage);
        setImageUrl(URL.createObjectURL(compressedImage));
        setImgPath(`profiles/${userData.email}`);
        console.log(`사용자 이미지 입력 : ${imgPath}`);
      } catch (error) {
        console.log(error);
      }
      // 입력한 파일을 순회하며 state에 추가

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };
  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrl('');
    setImage(undefined);
    setImgPath('profiles/default.jpg');
  };

  const [nickname, setNickname] = useState<string>('');
  const [isName, setIsName] = useState<boolean>(false);
  const [nameMessage, setNameMessage] = useState<string>('');
  // 입력창 변화를 감지할 함수
  const onChangeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
    if (event.target.value.length <= 1 || event.target.value.length > 10) {
      setNameMessage('1글자 이상 11글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 닉네임 형식입니다 :)');
      setIsName(true);
    }
  };
  const [email, setEmail] = useState<string>('');

  // 검색 키워드
  const [keyword, setKeyword] = useState<string>('');
  // 태그를 저장할 배열
  const [tags, setTags] = useState<Array<TagType>>([]);

  useEffect(() => {
    // 이미 등록된 관심태그
    const myTags: Array<TagType> = [];
    // 내 관심태그 추가
    if (userData.tags) {
      userData.tags.map((tag: any) =>
        myTags.push({
          className: `tag-${Math.floor(Math.random() * 4) + 1}`,
          value: tag.tagName,
        })
      );
    }
    setTags(myTags);
    if (userData.nickname) {
      setNickname(userData.nickname);
    }
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  // 검색 함수
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();

    // 전에 검색하지 않은 키워드만 검색하도록 index를 찾음
    const index = tags.findIndex((tag: TagType) => keyword === tag.value);

    const newTags = tags;

    // 빈 문자열이 아니고 없는 키워드일 경우 검색
    if (keyword.trim().length !== 0 && index === -1) {
      // 배열에 추가
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

  // 새로 업데이트 된 관심태그 리스트
  const tagList: any = [];
  // 내 관심태그 추가
  if (tags) {
    tags.map((tag: any) => tagList.push(tag.value));
  }

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

  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);

  const onClickSaveModal = useCallback(() => {
    setOpenSaveModal(!openSaveModal);
  }, [openSaveModal]);

  // 변경사항 저장 api
  const handleSaveModifyData = async () => {
    console.log(image);

    if (image === undefined) {
      const newData: any = await modifyApi.modifyData(
        user.id,
        imgPath,
        nickname,
        tagList
      );
      if (newData.status === 200) {
        onClickSaveModal();
      } else {
        console.log('에러');
      }
    } else {
      const deleteRes: any = await deleteImage(userData.imgPath, user.email);
      const path = await uploadImages([image], 'profile', user.email);
      const newData: any = await modifyApi.modifyData(
        user.id,
        path[0],
        nickname,
        tagList
      );
      if (newData.status === 200) {
        onClickSaveModal();
      } else {
        console.log('에러');
      }
    }
  };

  // 비밀번호 변경하러 가기
  const goModifyPwd = () => {
    navigate('/modify-pwd');
  };

  // 로그아웃
  const goLogout = () => {
    localStorage.clear();
  };

  // 회원 탈퇴
  const doWithdraw = async () => {
    localStorage.clear();

    const res = await modifyApi.goWithdraw(user.id);
    if (res === 200) {
      navigate('/');
    }
  };

  return (
    <div>
      {openSaveModal && (
        <Modal onClickToggleModal={onClickSaveModal}>
          <div className="follow_delete_modal">
            <h3 className="follow_delete_text">저장되었습니다.</h3>
            <button
              className="follow_delete_btn"
              type="button"
              onClick={() => {
                setOpenSaveModal(!openSaveModal);
              }}
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
      <UserModifyPage
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        name={nickname}
        isName={isName}
        nameMessage={nameMessage}
        email={email}
        tags={tags}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        handleSearch={handleSearch}
        handleTagDelete={handleTagDelete}
        handleSaveModifyData={handleSaveModifyData}
        onChangeNickName={onChangeNickName}
        goModifyPwd={goModifyPwd}
        goLogout={goLogout}
        doWithdraw={doWithdraw}
      />
    </div>
  );
}

export default UserModifyContainer;
