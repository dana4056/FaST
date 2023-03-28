import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Spin } from '../assets/images/Spin.svg';

function LoadingPage() {
  const location = useLocation();
  console.log(location.search.split('=')[1]);
  return (
    <div className="intro-page">
      <Spin style={{ backgroundColor: 'rgba(0,0,0,0)', margin: '0 auto' }} />
    </div>
  );
}
export default LoadingPage;
