import {Canvas, useFrame} from '@react-three/fiber'
import {useRef} from 'react'
import * as THREE from 'three'
import './App.css'

function Experience(){
  const cubeRef = useRef();
  
  
  useFrame((state,delta)=>{
    cubeRef.current.rotation.y += delta;

    const angle = state.clock.elapsedTime;

    state.camera.position.x = Math.sin(angle)*8;
    state.camera.position.z = Math.cos(angle)*8;
    state.camera.lookAt(0,0,0);
  });


return (

  <>  


      <group>
        <mesh position={[-2,0,0]}>
            <sphereGeometry/>
            <meshPhongMaterial color="#8E20AA"/> 
        </mesh>
        <mesh ref={cubeRef} position={[2,0,0]} scale={1.5}>
            <boxGeometry/>
            <meshPhongMaterial color="#F9E79F"/> 
        </mesh>
        <mesh position={[0,-1,0]} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
            <circleGeometry/>
            <meshPhongMaterial color="#5D6D7E"/> 
        </mesh>
        {/* <camera args={[0,0,1]}/> */}
      </group>
      <ambientLight intensity={0.3}/>
      <directionalLight position={[1,2,3]} intensity={3}/>
      <axesHelper scale={10}/>
  </>
)
}

function App() {
  return(
  <> 
    <Canvas>
    <Experience></Experience>
    </Canvas>
  </>
  )
  
}

export default App

