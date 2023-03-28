import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Spin } from '../assets/images/Spin.svg';
import { encryptToken } from '../utils/passwordEncryption';
import api from '../api/login';

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.search.split('=')[1]);

  const jwt = location.search.split('=')[1];

  const login = async () => {
    const res = await api.fastLogin(jwt);
    if (res === 200) {
      navigate('/home');
    }
  };

  useEffect(() => {
    login();
    // localStorage.setItem('token', encryptToken(jwt, email));
  }, []);
  return (
    <div className="intro-page">
      <Spin style={{ backgroundColor: 'rgba(0,0,0,0)', margin: '0 auto' }} />
    </div>
  );
}
export default LoadingPage;
