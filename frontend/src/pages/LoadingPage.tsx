import React from 'react';

import { ReactComponent as Spin } from '../assets/images/Spin.svg';

function LoadingPage() {
  return (
    <div className="intro-page">
      <Spin style={{ backgroundColor: 'rgba(0,0,0,0)', margin: '0 auto' }} />
    </div>
  );
}
export default LoadingPage;
