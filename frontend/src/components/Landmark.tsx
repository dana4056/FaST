import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { BlurShaderUtils } from 'three-stdlib';

function Landmark({ Model, cameraPosition }: any) {
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
            intensity={2}
          />
          <directionalLight
            // eslint-disable-next-line react/no-unknown-property
            intensity={0.5}
            // eslint-disable-next-line react/no-unknown-property
            castShadow
          />

          <Suspense fallback={null}>
            <Model receiveShadow />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
export default Landmark;
