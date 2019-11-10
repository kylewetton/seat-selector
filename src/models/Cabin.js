import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  
export default function Model(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/cabin.glb', loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <group ref={group} {...props}>
      <scene name="Scene" >
        <mesh name="inner" receiveShadow castShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
          <meshPhongMaterial attach="material" color="#FFFFFF" transparent opacity={1} />
        </mesh>
        <mesh name="overhead" receiveShadow castShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[2].geometry} />
          <meshPhongMaterial attach="material" color="#FFFFFF" transparent opacity={0.2}/>
        </mesh>
        <mesh name="overhead001" receiveShadow castShadow>
          <bufferGeometry attach="geometry" {...gltf.__$[3].geometry} />
          <meshPhongMaterial attach="material" color="#FFFFFF" transparent opacity={0.2}/>
        </mesh>
        <group name="outer" >
          <mesh name="Cylinder_0" receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
            <meshPhongMaterial attach="material" color="#4a6f8a" transparent opacity={1} name="Material.002" />
          </mesh>
          <mesh name="Cylinder_1" receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
            <meshPhongMaterial attach="material" color="#4a6f8a" transparent opacity={1} name="Material.002" />
          </mesh>
          <mesh name="Cylinder_2" receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
            <meshPhongMaterial attach="material" color="#4a6f8a" transparent opacity={1} name="Material.002" />
          </mesh>
          <mesh name="Cylinder_3" receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...gltf.__$[8].geometry} />
            <meshPhongMaterial attach="material" color="#4a6f8a" transparent opacity={1} name="Material.002" />
          </mesh>
        </group>
      </scene>
    </group>
  )
}