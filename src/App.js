import React, {Suspense, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Seat from './models/Seat'
import './App.css'


const Loading = () => (<mesh>
       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
       <meshNormalMaterial attach="material" />
</mesh>)

const App = () => {
  return (
    <Canvas>
      <Suspense fallback={<Loading />}>
        <Seat /> 
      </Suspense>
    </Canvas>
  )
}

export default App;

