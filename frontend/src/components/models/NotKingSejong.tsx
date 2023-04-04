/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 NotKingSejong.glb --types
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/models/NotKingSejong.glb'
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} position={[0, -1.5, 0]} receiveShadow>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[1.5, 0.65, 1]}
      />
    </group>
  );
}

useGLTF.preload('/models/NotKingSejong.glb');
