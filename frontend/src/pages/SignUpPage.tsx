import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const tag = [
    [
      {
        tagName: '바다',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 0,
      },
      {
        tagName: '산',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 1,
      },
      {
        tagName: '액티비티',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 2,
      },
    ],
    [
      {
        tagName: '강',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 3,
      },
      {
        tagName: '유적지',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 4,
      },
      {
        tagName: '계곡',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 5,
      },
    ],
    [
      {
        tagName: '호캉스',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 6,
      },
      {
        tagName: '캠핑',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 7,
      },
      {
        tagName: '힐링',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 8,
      },
    ],
    [
      {
        tagName: '배낭여행',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 9,
      },
      {
        tagName: '박물관',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 10,
      },
      {
        tagName: '자전거',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 11,
      },
    ],
    [
      {
        tagName: '등산',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 12,
      },
      {
        tagName: '휴양지',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 13,
      },
      {
        tagName: '도심',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 14,
      },
    ],
  ];
  const [selectedTag, setSelectedTag] = useState([]);
  // 다음 버튼 클릭 시 관심 태그 설정하러 이동
  const onClickNext = () => {
    setIsOpen(() => true);
  };

  // 회원가입 api 통신
  const onClickComplete = () => {
    console.log('완료 버튼 클릭 + 회원가입 통신 처리하기 !!!');
    navigate('/login');
  };

  // 사용자가 관심 태그를 선택할 때마다 실행되는 함수
  const onClickTag = (e: number) => {
    console.log(`관심 태그 선택!!${e}`);
    const idx = e;
  };

  useEffect(() => {
    console.log('changed!');
  }, [isChecked]);

  return (
    <div className="sign-up-wide-page">
      <div
        className="sign-up-wide-page__wrapper"
        style={isOpen ? { transform: 'translateX(-100%)' } : {}}
      >
        <div className="sign-up-page">
          <div className="sign-up-page__row">
            <BsPersonCircle className="sign-up-page__image" />
          </div>
          <form className="sign-up-page">
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <text className="sign-up-page__text">이메일</text>
              </div>
              <input className="card sign-up-page__input" type="email" />
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <text className="sign-up-page__text">인증번호</text>
              </div>
            </div>
            <div className="sign-up-page__row">
              <input
                className="card sign-up-page__auth__input"
                type="password"
              />
              <button className="card sign-up-page__button" type="button">
                인증하기
              </button>
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <text className="sign-up-page__text">닉네임</text>
              </div>
              <input
                className="card sign-up-page__input"
                type="text"
                placeholder="중복 불가능, 1~10자리"
              />
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <text className="sign-up-page__text">비밀번호</text>
              </div>
              <input
                className="card sign-up-page__input"
                type="password"
                placeholder="영어, 숫자 8~15자리"
              />
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <text className="sign-up-page__text">비밀번호 확인</text>
              </div>
              <input
                className="card sign-up-page__input"
                type="password"
                placeholder="영어, 숫자 8~15자리"
              />
            </div>
            <div className="sign-up-page__row__next">
              <button
                className="card sign-up-page__next__button"
                type="button"
                onClick={onClickNext}
              >
                다음
              </button>
            </div>
          </form>
        </div>
        {/* ========= 관심 태그 ========= */}
        <div className="sign-up-favorite-tag-page">
          <div className="sign-up-favorite-tag-page__row">
            <text className="sign-up-favorite-tag-page__title">관심 태그</text>
            <div className="sign-up-favorite-tag-page__container">
              <div className="sign-up-favorite-tag-page__row">
                {tag[0].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[1].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[2].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[3].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[4].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sign-up-page__row__next">
            <button
              className="card sign-up-page__next__button"
              type="button"
              onClick={onClickComplete}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
