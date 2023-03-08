import React, { Suspense } from 'react';
import Landmark from '../components/Landmark';
import Sungnyemun from '../assets/blender/Sungnyemun';
import Logo from '../assets/blender/Logo';

function TestPage() {
  return (
    <div>
      <Landmark Model={Sungnyemun} cameraPosition={[0, 2, 8]} />
    </div>
  );
}

export default TestPage;
