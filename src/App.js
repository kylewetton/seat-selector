import * as THREE from 'three'
import React, {Suspense, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useRender, useFrame, useResource } from 'react-three-fiber'
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

const Temp = ({onClick}) => {
  return (
      <mesh
        onClick={onClick}
      >
        <boxBufferGeometry attach="geometry" args={[1, 2, 1]} />
        < meshNormalMaterial attach="material" />
    </mesh>
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


const Plane = ({onClick, ...props}) => {
  return (
    <group>
      <Temp onClick={onClick} />
      <FloorPlan />
      <Cabin />
      <mesh rotation-x={radian(-90)} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[17, 150, 1]} />
        <meshPhongMaterial attach="material" color="#707068" />
      </mesh>
  </group>
  )
}


function Lights() {
  const [ref, light] = useResource()
  let d = 90;
  return (
    <>
      <ambientLight intensity={0.6} color={'#ffffff'} />
      <directionalLight
        ref={ref}
        color={'#ffffff'}
        intensity={0.6}
        position={[5, 50, 0]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left = {d * -1}
        shadow-camera-right = {d}
        shadow-camera-top = {d}
        shadow-camera-bottom = {d * -1}
         castShadow
      />
    
      {/* {light && <directionalLightHelper args={[light, 5]} />} */}
    </>
  )
}

function Dolly({position}) {
  useFrame(state => {
    if (state.camera.position.z > position) {
      state.camera.position.z = state.camera.position.z - 2  
      state.camera.updateProjectionMatrix()
    }
    
    if (state.camera.position.z < position) {
        state.camera.position.z = state.camera.position.z + 2  
        state.camera.updateProjectionMatrix()
    }
    
  })
  return null
}



const App = () => {
  let camRotation = radian(-15);
  const [camPosition, setCamPosition] = useState(108);

  const handleDolly = pos => {
    setCamPosition(pos);
  }

  return (
    <Canvas
   // ref={camRef}
    camera={{
      position: [0, 20, 108],
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
        <Lights />
          <Plane onClick={() =>  handleDolly(70)} />
          <Dolly position={camPosition} />
        </Suspense>
    </Canvas>
  )
}

export default App;

