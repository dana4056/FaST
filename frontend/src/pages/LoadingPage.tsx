import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ReactComponent as Spinner } from '../assets/images/Spinner.svg';
import api from '../api/login';
import { userInfo } from '../atoms/userInfo';

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  // console.log(location.search.split('=')[1]);

  const jwt = location.search.split('=')[1];
  const tag = [
    '바다',
    '산',
    '액티비티',
    '강',
    '유적지',
    '계곡',
    '호캉스',
    '캠핑',
    '힐링',
    '배낭여행',
    '박물관',
    '자전거',
    '등산',
    '휴양지',
    '도심',
  ];
  const login = async () => {
    const res = await api.fastLogin(jwt);
    if (res.status === 200) {
      // recoil-persist로 localstorage에 user 정보 저장
      if (res.data.tags.length === 0) {
        const resTag = await api.registerTag(tag, res.data.id);
      }
      setUser(res.data);
      navigate('/home');
    }
  };

  useEffect(() => {
    login();
    // localStorage.setItem('token', encryptToken(jwt, email));
  }, []);
  return (
    <div className="intro-page">
      <Spinner style={{ backgroundColor: 'rgba(0,0,0,0)', margin: '0 auto' }} />
    </div>
  );
}
export default LoadingPage;
