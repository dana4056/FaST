import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Landmark({ Model, cameraPosition, isControllable }: any) {
  return (
    <div className="landmark">
      <div className="landmark__canvas">
        <Canvas
          camera={{
            fov: 60,
            position: cameraPosition,
          }}
        >
          <ambientLight
            // eslint-disable-next-line react/no-unknown-property
            intensity={0.5}
          />
          <directionalLight
            // eslint-disable-next-line react/no-unknown-property
            intensity={1}
            // eslint-disable-next-line react/no-unknown-property
            castShadow
          />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          {isControllable ? <OrbitControls /> : null}
        </Canvas>
      </div>
    </div>
  );
}
export default Landmark;
