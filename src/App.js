import * as THREE from 'three'
import React, {Suspense, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useRender } from 'react-three-fiber'
import Seat from './models/Seat'
import Cabin from './models/Cabin'
import './App.css'

// Move to helper
function radian(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

const Loading = () => (<mesh>
       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
       <meshNormalMaterial attach="material" />
</mesh>)


const Plane = props => {
  return (
    <group>
      <FloorPlan/>
      <Cabin />
      <mesh rotation-x={radian(-90)} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[17, 150, 1]} />
        <meshPhongMaterial attach="material" color="#707068" />
      </mesh>
  </group>
  )
}

const SeatGroup = props => {
  return (
    <group {...props}>
      <Seat scale={[props.mirror ? -1 : 1,1,1]} position={[-2.1,0,0]} /> 
      <Seat scale={[props.mirror ? -1 : 1,1,1]} position={[0,0,0]} /> 
      <Seat scale={[props.mirror ? -1 : 1,1,1]} position={[2.1,0,0]} /> 
    </group>
  )
}

const Row = props => {
  return (
    <group {...props}>
      <SeatGroup position={[5.5,0,25]} />
      <SeatGroup mirror={true} position={[-5.5,0,25]} />
    </group>
  )
}

const FloorPlan = () => {
  let rows = [];
  for (var i = 0; i < 27; i++) {
    if (i % 10 === 0) {
      rows.push(null);
    } else {
       rows.push(<Row key={i} position-z={-98 + (i * 5.55)} />)
    }
  }
  return (
    <group>
    {rows}
    </group>
  )
}

const Test = () => {
  return (
    <mesh castShadow receiveShadow position-y={2}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 100]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  )
}

const App = () => {
  let camRotation = radian(-15);

  return (
    <Canvas
    
    camera={{
      position: [0, 20, 110],
      rotation: [camRotation,0,0],
      fov: 30
    }}
    gl={{ alpha: false }}
    onCreated={({ gl, scene }) => {
      scene.background = new THREE.Color('#efefef')
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}
    >
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[-60, 5, 50]} angle={Math.PI / 2} penumbra={1} castShadow />
        <spotLight intensity={0.6} position={[50, 5, -60]} angle={Math.PI / 2} penumbra={1} castShadow />
        <directionalLight intensity={0.5} position={[0,30,0]} color="#73aed9" castShadow />
        
          <Plane />
          
        </Suspense>
    </Canvas>
  )
}

export default App;

