/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Gwangandaegyo.glb --types
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    NurbsPath181: THREE.Mesh;
    NurbsPath181_1: THREE.Mesh;
    NurbsPath181_2: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
  };
};

export default function Model() {
  const { nodes, materials } = useGLTF(
    '/models/Gwangandaegyo.glb'
  ) as GLTFResult;
  return (
    <group dispose={null} position={[0, -0.5, 0]}>
      <group rotation={[0, 0, Math.PI / 2]} scale={[0.07, 1, 1]}>
        <mesh
          geometry={nodes.NurbsPath181.geometry}
          material={materials['Material.001']}
        />
        <mesh
          geometry={nodes.NurbsPath181_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          geometry={nodes.NurbsPath181_2.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Gwangandaegyo.glb');
