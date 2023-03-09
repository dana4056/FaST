import React, { Suspense } from 'react';
import Landmark from '../components/Landmark';
import Sungnyemun from '../assets/blender/Sungnyemun';
import SeoulTower from '../assets/blender/SeoulTower';
import Cheomseongdae from '../assets/blender/Cheomseongdae';
import Gwangandaegyo from '../assets/blender/Gwangandaegyo';

function TestPage() {
  return (
    <div>
      <Landmark Model={Sungnyemun} cameraPosition={[0, 2, 8]} />
      <Landmark Model={SeoulTower} cameraPosition={[0, 2, 9]} />
      <Landmark Model={Cheomseongdae} cameraPosition={[0, 2, 8]} />
      <Landmark Model={Gwangandaegyo} cameraPosition={[0, 2, 5]} />
    </div>
  );
}

export default TestPage;
