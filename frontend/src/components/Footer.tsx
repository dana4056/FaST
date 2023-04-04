import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { VscHome } from '@react-icons/all-files/vsc/VscHome';
import { BsPeople } from '@react-icons/all-files/bs/BsPeople';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { CgPolaroid } from '@react-icons/all-files/cg/CgPolaroid';
import { IoSettingsOutline } from '@react-icons/all-files/io5/IoSettingsOutline';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../atoms/userInfo';

function Footer() {
  const [user, setUser] = useRecoilState(userInfo);
  const navigate = useNavigate();
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

  return (
    <div className="footer">
      <input type="radio" id="one" name="buttons" onClick={onClickHome} />
      <label htmlFor="one" className="icons home">
        {}
        <VscHome />
      </label>
      <input type="radio" id="two" name="buttons" onClick={onClickPeople} />
      <label htmlFor="two" className="icons people">
        <BsPeople />
        {}
      </label>
      <input type="radio" id="three" name="buttons" onClick={onClickNewCard} />
      <label htmlFor="three" className="icons plus">
        <FaPlus />
        {}
      </label>
      <input type="radio" id="four" name="buttons" onClick={onClickMyrecord} />
      <label htmlFor="four" className="icons myrecord">
        <CgPolaroid />
        {}
      </label>
      <input type="radio" id="five" name="buttons" onClick={onClickMyPage} />
      <label htmlFor="five" className="icons mypage">
        <IoSettingsOutline />
        {}
      </label>
      <span className="title home">Home</span>
      <span className="title people">People</span>
      <span className="title plus">Plus</span>
      <span className="title myrecord">MyRecord</span>
      <span className="title mypage">MyPage</span>
      <div className="border" />
    </div>
  );
}

export default Footer;
