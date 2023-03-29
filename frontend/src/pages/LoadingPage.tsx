import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ReactComponent as Spin } from '../assets/images/Spin.svg';
import { encryptToken } from '../utils/passwordEncryption';
import api from '../api/login';
import { userInfo } from '../atoms/userInfo';

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setuser] = useRecoilState(userInfo);
  // console.log(location.search.split('=')[1]);

  const jwt = location.search.split('=')[1];

  const login = async () => {
    const res = await api.fastLogin(jwt);
    if (res.status === 200) {
      // recoil-persist로 localstorage에 user 정보 저장
      setuser(res.data);
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
