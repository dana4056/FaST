import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/home">
          <Logo />
        </Link>
      </div>
    </div>
  );
}

export default Header;
