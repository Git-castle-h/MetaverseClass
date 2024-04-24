import { Canvas } from'@react-three/fiber'
import './App.css'
import { OrbitControls, useGLTF } from'@react-three/drei'
import { Perf} from'r3f-perf'
import { CuboidCollider, CylinderCollider, Physics, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'

  function App() {
    return(
      <Canvas shadows camera={{fov: 75, position: [0, 1, 10] }}>
          <Experience />
      </Canvas>
    )
  }
  export default App
  

 function Experience() {

  const cube = useRef();

  const bookGLTF = useGLTF("./books_with_magnifier.glb");

  const cubeJump = () =>{
    console.log(cube.current);
    cube.current.applyImpulse({x:0, y:5, z:0})
    cube.current.applyTorqueImpulse({x:0,y:1,z:0})
  }

  return<>
    <Perf position="top-left"/>
    <OrbitControls enableDamping={false} />
    <ambientLight intensity={0.5} />
    <directionalLight castShadow position={[0, 4, 0]}intensity={1.5}/>
    <group>
      <Physics debug>
        <RigidBody colliders="trimesh" position={[1,1,-0.25]} rotation={[Math.PI/3,0,0]} scale={[1,1,1]}>
          <mesh castShadow onClick={cubeJump}>
            <torusGeometry args={[1,0.5,16,32]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0,0,0]} colliders="trimesh">
          <primitive object={bookGLTF.scene} scale={5}></primitive>
        </RigidBody>

        <RigidBody colliders="ball"  position={[0, 4, 0]}>
          <mesh castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="#82E0AA" />
          </mesh>
        </RigidBody>
      <RigidBody type='fixed'>
        <mesh  castShadow receiveShadow position-y={-1}>
          <boxGeometry args={[10, 0.1, 10]}/>
          <meshStandardMaterial color="#5D6D7E" />
        </mesh>
      </RigidBody>
      </Physics>
      <axesHelper></axesHelper>
    </group>

  </>
  }

