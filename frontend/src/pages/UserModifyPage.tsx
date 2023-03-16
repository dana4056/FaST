import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import InputProfile from '../components/SignUp/InputProfile';
import { InputProfileProps } from '../types/ComponentPropsType';
import { UserModifyProps } from '../types/PagePropsType';
import SearchBox from '../components/SearchBox';

function UserModifyPage({
  tags,
  keyword,
  handleKeywordChange,
  handleSearch,
  handleTagDelete,
  email,
  name,
  imageUrl,
  handleImageChange,
  handleImageDelete,
}: UserModifyProps) {
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] =
    useState<boolean>(false);

  const onClickLogoutModal = useCallback(() => {
    setOpenLogoutModal(!openLogoutModal);
  }, [openLogoutModal]);
  const onClickWithdrawalModal = useCallback(() => {
    setOpenWithdrawalModal(!openWithdrawalModal);
  }, [openWithdrawalModal]);

  return (
    <div>
      <InputProfile
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
      />
      <div className="modify__container">
        <span className="modify__tag__text">내 관심태그</span>
      </div>
      <SearchBox
        tags={tags}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
        handleSearch={handleSearch}
        handleTagDelete={handleTagDelete}
      />
      <div className="modify__container">
        <div className="modify__email__container">
          <span className="modify__email__text">이메일</span>
          <input
            placeholder="example@email.com"
            className="card modify__input"
            type="email"
          />
        </div>
        <div className="sign-up-page__row__text">
          <span className="sign-up-page__text">닉네임</span>
        </div>
        <input
          className="card modify__input"
          type="text"
          placeholder="중복 불가능, 1~10자리"
          // onChange={onChangeNickName}
        />
        {/* {name.length > 0 && (
        <span className={`message ${isName ? 'success' : 'error'}`}>
        {nameMessage}
        </span>
      )} */}
      </div>
      <div className="modify__buttons">
        <button type="button" className="modify__button modify__password">
          비밀번호 변경하러 가기
        </button>
        <button type="button" className="modify__button modify__save">
          저장하기
        </button>
        {openLogoutModal && (
          <Modal onClickToggleModal={onClickLogoutModal}>
            <div className="follow_delete_modal">
              <h3 className="follow_delete_text">로그아웃</h3>
              <div>
                <p>로그아웃 하시겠습니까?</p>
              </div>
              <Link to="/">
                <button className="follow_delete_btn" type="button">
                  예
                </button>
              </Link>
              <button
                className="follow_delete_btn"
                type="button"
                onClick={() => {
                  setOpenLogoutModal(!openLogoutModal);
                }}
              >
                아니요
              </button>
            </div>
          </Modal>
        )}
        <button type="button" className="logout" onClick={onClickLogoutModal}>
          로그아웃
        </button>

        {openWithdrawalModal && (
          <Modal onClickToggleModal={onClickWithdrawalModal}>
            <div className="follow_delete_modal">
              <h3 className="follow_delete_text">회원 탈퇴</h3>
              <div>
                <p>
                  탈퇴하실 경우 기록이 모두 지워지며 <br /> 복구가 불가합니다.
                  <br />
                  정말 탈퇴하시겠습니까?
                </p>
              </div>
              <Link to="/">
                <button className="follow_delete_btn" type="button">
                  예
                </button>
              </Link>
              <button
                className="follow_delete_btn"
                type="button"
                onClick={() => {
                  setOpenWithdrawalModal(!openWithdrawalModal);
                }}
              >
                아니요
              </button>
            </div>
          </Modal>
        )}
        <button
          type="button"
          className="withdrawal"
          onClick={onClickWithdrawalModal}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

export default UserModifyPage;
