import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  
export default function Seat(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/seat.glb', loader => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco-gltf/')
    loader.setDRACOLoader(dracoLoader)
  })


  return (
    <group ref={group} {...props}>
      <scene name="Scene" >
        <object3D name="air_chair" >
          <object3D name="aircraft_seat" >
            <object3D name="Air_chair_arm_002" >
              <group name="bilca_003" >
                <mesh name="Mesh.067_0" >
                  <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
                  <meshStandardMaterial attach="material" {...gltf.__$[5].material} />
                </mesh>
                <mesh name="Mesh.067_1" >
                  <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
                  <meshStandardMaterial attach="material" {...gltf.__$[6].material} />
                </mesh>
                <mesh name="Mesh.067_2" >
                  <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
                  <meshStandardMaterial attach="material" {...gltf.__$[7].material} />
                </mesh>
                <mesh name="Mesh.067_3" >
                  <bufferGeometry attach="geometry" {...gltf.__$[8].geometry} />
                  <meshStandardMaterial attach="material" {...gltf.__$[8].material} />
                </mesh>
              </group>
            </object3D>
            <object3D name="Air_chair_arm_01" />
          </object3D>
        </object3D>
      </scene>
    </group>
  )
}