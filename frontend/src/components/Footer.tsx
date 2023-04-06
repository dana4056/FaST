import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HiHome } from '@react-icons/all-files/hi/HiHome';
import { BsPeopleFill } from '@react-icons/all-files/bs/BsPeopleFill';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { CgPolaroid } from '@react-icons/all-files/cg/CgPolaroid';
import { MdSettings } from '@react-icons/all-files/md/MdSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';

function Footer() {
  const [user, setUser] = useRecoilState(userInfo);
  const homeRef = useRef<HTMLInputElement>(null);
  const plusRef = useRef<HTMLInputElement>(null);
  const peopleRef = useRef<HTMLInputElement>(null);
  const recordRef = useRef<HTMLInputElement>(null);
  const mypageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const onClickHome = () => {
    navigate('/home');
  };
  const onClickPeople = () => {
    navigate('/people');
  };
  const onClickNewCard = () => {
    navigate('/newcard');
  };
  const onClickMyrecord = () => {
    navigate(`/record/${user.id}`);
  };
  const onClickMyPage = () => {
    navigate('/mypage');
  };
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path === 'home') {
      if (homeRef.current) {
        homeRef.current.checked = true;
      }
    } else if (path === 'people') {
      if (peopleRef.current) {
        peopleRef.current.checked = true;
      }
    } else if (path === 'newcard') {
      if (plusRef.current) {
        plusRef.current.checked = true;
      }
    } else if (path === 'record') {
      if (location.pathname.split('/')[2] === String(user.id)) {
        if (recordRef.current) {
          recordRef.current.checked = true;
        }
      }
    } else if (path === 'mypage') {
      if (mypageRef.current) {
        mypageRef.current.checked = true;
      }
    }
  }, [location]);

  return (
    <div className="footer">
      <input
        type="radio"
        id="one"
        name="buttons"
        onClick={onClickHome}
        ref={homeRef}
      />
      <label htmlFor="one" className="icons home">
        {}
        <HiHome />
      </label>
      <input
        type="radio"
        id="two"
        name="buttons"
        onClick={onClickPeople}
        ref={peopleRef}
      />
      <label htmlFor="two" className="icons people">
        <BsPeopleFill />
        {}
      </label>
      <input
        type="radio"
        id="three"
        name="buttons"
        onClick={onClickNewCard}
        ref={plusRef}
      />
      <label htmlFor="three" className="icons plus">
        <FaPlus />
        {}
      </label>
      <input
        type="radio"
        id="four"
        name="buttons"
        onClick={onClickMyrecord}
        ref={recordRef}
      />
      <label htmlFor="four" className="icons myrecord">
        <CgPolaroid />
        {}
      </label>
      <input
        type="radio"
        id="five"
        name="buttons"
        onClick={onClickMyPage}
        ref={mypageRef}
      />
      <label htmlFor="five" className="icons mypage">
        <MdSettings />
        {}
      </label>
      <span className="title home">Home</span>
      <span className="title people">People</span>
      <span className="title plus">Plus</span>
      <span className="title myrecord">MyRecord</span>
      <span className="title mypage">Setting</span>
      <div className="border">
        <div className="footer__circle" />
      </div>
    </div>
  );
}

export default Footer;
