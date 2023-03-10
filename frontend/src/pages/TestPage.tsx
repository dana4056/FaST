import React, { Suspense } from 'react';
import Landmark from '../components/Landmark';
import Sungnyemun from '../assets/blender/Sungnyemun';
import SeoulTower from '../assets/blender/SeoulTower';
import Cheomseongdae from '../assets/blender/Cheomseongdae';
import Gwangandaegyo from '../assets/blender/Gwangandaegyo';
import ChinaTown from '../assets/blender/ChinaTown';
import Yisunshin from '../assets/blender/Yisunshin';
import LotteTower from '../assets/blender/LotteTower';

function TestPage() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Landmark Model={Sungnyemun} cameraPosition={[0, 2, 8]} />
      <Landmark Model={SeoulTower} cameraPosition={[0, 2, 9]} />
      <Landmark Model={Cheomseongdae} cameraPosition={[0, 2, 8]} />
      <Landmark Model={Gwangandaegyo} cameraPosition={[0, 2, 5]} />
      <Landmark Model={ChinaTown} cameraPosition={[0, 2, 18]} />
      <Landmark Model={Yisunshin} cameraPosition={[0, 2, 5.5]} />
      <Landmark Model={LotteTower} cameraPosition={[0, 2, 6]} />
    </div>
  );
}

export default TestPage;
