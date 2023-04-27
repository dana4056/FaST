import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import IntroPage from '../pages/IntroPage';
import { userInfo } from '../atoms/userInfo';
import useViewModel from '../viewmodels/UserViewModel';

function IntroContainer() {
  const user = useRecoilValue(userInfo);
  const { getMyData } = useViewModel();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.id !== 0) {
      const getData = async () => {
        const res: any = await getMyData(user.id);
        if (res.status === 200) {
          navigate('/home');
        }
      };
      getData();
    }
  }, []);
  return <IntroPage />;
}

export default IntroContainer;
