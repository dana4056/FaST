import React, { Suspense } from 'react';
import Landmark from '../components/Landmark';
import Sungnyemun from '../assets/blender/Sungnyemun';
import SeoulTower from '../assets/blender/SeoulTower';

function TestPage() {
  return (
    <div>
      <Landmark Model={Sungnyemun} cameraPosition={[0, 2, 8]} />
      <Landmark Model={SeoulTower} cameraPosition={[0, 2, 9]} />
    </div>
  );
}

export default TestPage;
