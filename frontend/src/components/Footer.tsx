import React, { useState } from 'react';
import { VscHome } from 'react-icons/vsc';
import { BsPeople } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate('/home');
  };
  const onClickNewCard = () => {
    navigate('/newcard');
  };
  const onClickMyrecord = () => {
    navigate('/myrecord');
  };
  const onClickMyPage = () => {
    navigate('/mypage');
  };

  return (
    <body className="footer">
      <input type="radio" id="one" name="buttons" onClick={onClickHome} />
      <label htmlFor="one" className="icons home">
        {}
        <VscHome />
      </label>
      <input type="radio" id="two" name="buttons" onClick={onClickHome} />
      <label htmlFor="two" className="icons people">
        <BsPeople />
        {}
      </label>
      <input type="radio" id="three" name="buttons" onClick={onClickNewCard} />
      <label htmlFor="three" className="icons plus">
        <svg width="0" height="0">
          <linearGradient id="plus-color" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#80ddf2" />
            <stop offset="100%" stopColor="#77a9f2" />
          </linearGradient>
        </svg>
        <FaPlus />
        {}
      </label>
      <input type="radio" id="four" name="buttons" onClick={onClickMyrecord} />
      <label htmlFor="four" className="icons myrecord">
        <AiOutlineCamera />
        {}
      </label>
      <input type="radio" id="five" name="buttons" onClick={onClickMyPage} />
      <label htmlFor="five" className="icons mypage">
        <IoSettingsOutline />
        {}
      </label>
      {/* <div id="box" /> */}
      <div id="body" />
      <span className="title home">Home</span>
      <span className="title people">People</span>
      <span className="title plus">Plus</span>
      <span className="title myrecord">MyRecord</span>
      <span className="title mypage">MyPage</span>
      <div className="border" />
    </body>
  );
}

export default Footer;
