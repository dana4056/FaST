/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Seongsan.glb --types
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Cylinder_1: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
    Cylinder001: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Seongsan.glb') as GLTFResult;
  const modelRef = useRef<Group>(null);
  useFrame(() => {
    if (modelRef.current !== null) modelRef.current.rotation.y += 0.01;
  });
  return (
    <group {...props} dispose={null} ref={modelRef}>
      <group scale={[1, 0.3, 1]}>
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials['Material.001']}
        />
        <mesh
          geometry={nodes.Cylinder_2.geometry}
          material={materials['Material.001']}
        />
      </group>
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.002']}
        position={[0, 0.11, 0]}
        scale={[1, 0.23, 1]}
      />
    </group>
  );
}

useGLTF.preload('/models/Seongsan.glb');