import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  
export default function Model(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/seat.glb', loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <group ref={group} {...props}>
      <scene name="Scene" >
        <object3D name="Area" position={[0, 6.401970863342285, 0,]} rotation={[0.1360890431413339, 0.029621457872527675, 0.42802755987904967,]} />
        <mesh name="base" castShadow receiveShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
          <meshPhongMaterial attach="material" color="#1f2f3b" name="Fabric" />
        </mesh>
        <mesh name="back" castShadow receiveShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
          <meshPhongMaterial attach="material" color="#1f2f3b" name="Fabric" />
        </mesh>
        <mesh name="pillow" castShadow receiveShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
          <meshPhongMaterial attach="material" color="#4a6f8a" name="Pillow" />
        </mesh>
        <group name="support" castShadow receiveShadow>
          <mesh name="Cube.004_0" >
            <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
            <meshPhongMaterial attach="material" color="#4a6f8a" name="Pillow" />
          </mesh>
          <mesh name="Cube.004_1" castShadow receiveShadow>
            <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
            <meshPhongMaterial attach="material" color="#f2e7e6" name="Material.001" />
          </mesh>
        </group>
      </scene>
    </group>
  )
}