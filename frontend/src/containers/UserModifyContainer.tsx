import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getDownloadURL, ref } from 'firebase/storage';
import UserModifyPage from '../pages/UserModifyPage';
import Modal from '../components/Modal';
import { userInfo } from '../atoms/userInfo';
import { TagType } from '../types/TagType';
import modifyApi from '../api/user';
import { storage } from '../utils/firebase';

function UserModifyContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  // 내 정보 조회 api
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    const getData = async () => {
      const myData: any = await modifyApi.getMyData(user.id);
      setUserData(myData.data);
    };
    getData();
  }, []);
  // console.log(userData);

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imgPath, setImgPath] = useState<string>('profiles/default.jpg');
  useEffect(() => {
    if (userData.imgPath?.substring(0, 4) === 'http') {
      setImageUrl(userData.imgPath);
      setImgPath(imageUrl);
    } else if (userData.imgPath) {
      const getProfileImage = async () => {
        const imageRef = ref(storage, userData.imgPath);
        const ret = await getDownloadURL(imageRef);
        setImageUrl(ret);
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
      const newImages: Array<File> = [];
      const newImageUrls: Array<string> = [];

      // 입력한 파일을 순회하며 state에 추가
      for (let i = 0; i < files.length; i += 1) {
        newImages[i] = files[i];
        newImageUrls[i] = URL.createObjectURL(files[i]);
      }
      setImage(newImages[0]);
      setImageUrl(newImageUrls[0]);
      setImgPath(`profiles/${userData.email}`);

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };
  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrl('');
    setImage(undefined);
    setImgPath('profiles/default.jpg');
    console.log(imgPath);
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
    console.log(`저장하기 버튼 클릭 : ${imgPath}`);
    console.log(nickname);
    console.log(tagList);
    const newData: any = await modifyApi.modifyData(
      user.id, // 유저 id
      imgPath,
      nickname,
      tagList
    );
    onClickSaveModal();
    return newData;
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
