import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { BsPeople } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <div className="footer__icon">
        <Link to="/home">
          <VscHome />
        </Link>
      </div>
      <div className="footer__icon">
        <Link to="/home">
          <BsPeople />
        </Link>
      </div>
      <div className="footer__icon footer__icon--plus">
        <svg width="0" height="0">
          <linearGradient id="plus-color" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#80ddf2" />
            <stop offset="100%" stopColor="#77a9f2" />
          </linearGradient>
        </svg>
        <Link to="/newcard">
          <FaPlus style={{ fill: 'url(#plus-color)' }} />
        </Link>
      </div>
      <div className="footer__icon">
        <Link to="/myrecord">
          <AiOutlineCamera />
        </Link>
      </div>
      <div className="footer__icon">
        <Link to="/modify">
          <IoSettingsOutline />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
