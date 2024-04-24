import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import * as THREE from 'three'
import './App.css'
import {useControls} from 'leva'
import {Perf} from 'r3f-perf'
import { Text,Html,OrbitControls,Float, Stats,useHelper, SoftShadows,Environment } from '@react-three/drei';

function Experience(){
  const cubeRef = useRef();
  const sphereRef = useRef();
  const light = useRef();

  const { position, color, select, text, perfVisible,axis, }= useControls({
    position: {
      value: -2, min: -2, max:2, step: 0.01
    },
    visible:true,
    text:"선택",
    select:{
      options:["CASE1","CASE2","CASE3"]
    },
    color:"#ff0000",
    perfVisible: true,
    axis:true,

  });

  const {enabled, ...config} = useControls({
    enabled:true,
    size:{value:25, min:0, max:100},
    focus:{value:0, min:0, max:2},
    samples:{value:10,min:1,max:20,step:1}
  });

  console.log(select);
  
  useFrame((state,delta)=>{
    cubeRef.current.rotation.y += delta;

    const angle = state.clock.elapsedTime;

    // state.camera.position.x = Math.sin(angle)*8;
    // state.camera.position.z = Math.cos(angle)*8;
    state.camera.lookAt(0,0,0);
  });
  
  useHelper(light, THREE.DirectionalLightHelper,1);
  

  const scene = useThree((state)=>state.scene)
  useEffect(()=>{
    // const helper = new THREE.CameraHelper(light.current.shadow.camera);
    // scene.add(helper);
    // return ()=>{
    //   scene.remove(helper);
    // }
  },[light.current]); 
return (

  <>  
      {/* <Stats></Stats> */}
      {perfVisible && <Perf position="bottom-left" ></Perf>}
      <OrbitControls enableDamping={false}></OrbitControls>
      {/* <ambientLight intensity={0.5}/> */}
      {/* <directionalLight ref={light} position={[1,2,3]} intensity={3} castShadow
        shadow-mapSize={[1024,1024]}
        shadow-camera-near ={1}
        shadow-camera-far ={100}
        shadow-camera-top ={10}
        shadow-camera-bottom ={-10}
        shadow-camera-right ={10}
        shadow-camera-left ={-10}
      /> */}
      <Float speed={7} floatIntensity={7}> 
        <Text wrapperClass="label3" position={[0,1.8,0]} fontSize={0.5} textAlign='center'>
                멋진R3f!
                <meshBasicMaterial></meshBasicMaterial>
        </Text>
      </Float>
      <Html position={[0,2,0]} wrapperClass="label" center distanceFactor={10}>
        안녕하세요
      </Html>

      <group>
        <mesh ref={cubeRef}  position-x={position} castShadow>
            <Text wrapperClass="label2" position={[0,0,1]} fontSize={0.5} receiveShadow>
              {text}
            </Text>
            <sphereGeometry/>
            <meshStandardMaterial color={color} /> 
        </mesh>
        <mesh ref={cubeRef} position={[2,0,0]} scale={1.5} castShadow  receiveShadow>
            <boxGeometry/>
            <meshStandardMaterial color="#F9E79F"/> 
        </mesh>
        <mesh position={[0,-1,0]} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10} castShadow receiveShadow>
            <circleGeometry/>
            <meshStandardMaterial color="#5D6D7E"/> 
        </mesh>
      </group>
      
      {enabled && <SoftShadows {...config}/>}
      {axis && <axesHelper scale={10}/>}
      <Environment
        background
          files={[
          "./Yokohama3/posx.jpg",
          "./Yokohama3/negx.jpg",
          "./Yokohama3/posy.jpg",
          "./Yokohama3/negy.jpg",
          "./Yokohama3/posz.jpg",
          "./Yokohama3/negz.jpg",
         ]}/>
      
  </>
)
}

function App() {

  const onCreated =(state) =>{
    // const gl = state.gl;
    // gl.setClearColor("#ff0000",1);
    // const scene = state.scene;
    // scene.background = new THREE.Color("red");
  }

  return(
  <> 
    <Canvas shadows onCreated={ onCreated}>
      {/* <color args={["yellow"]} attach="background"></color> */}
    <Experience></Experience>
    </Canvas>
  </>
  )
  
}

export default App

