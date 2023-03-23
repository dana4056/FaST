import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

function Landmark({ Model, cameraPosition, transX, transY }: any) {
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
            <Model transX={transX} transY={transY} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
export default Landmark;
