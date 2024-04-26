import { useEffect, useRef, useState } from 'react'
import './App.css'
import * as THREE from "three"
import {Canvas,useFrame,useThree} from '@react-three/fiber'
import {Environment, KeyboardControls, Loader, OrbitControls, Sky, SoftShadows} from "@react-three/drei"
import {Physics, RigidBody} from '@react-three/rapier'
import  MyCharacter  from './myCharacter';
import {Perf} from "r3f-perf";
import {Model as City} from './City';
import { Colleague } from './Colleague';
import { DEG2RAD } from"three/src/math/MathUtils"
import ServerConnector,{ castAtom, socket } from './ServerConnector'
import { useAtom } from 'jotai'
import LoginOverlay, { userNameAtom } from './LoginOverlay'
import TalkOverlay from './TalkOverlay'
import { Bloom, EffectComposer,N8AO, TiltShift2 } from '@react-three/postprocessing'

function App() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] =useState(false);
  const [userName] =useAtom(userNameAtom);
  return (
    <>
    <ServerConnector/>
    <KeyboardControls
      map={[
        {name:"forward",keys:["ArrowUp","KeyW"]},
        {name:"backward",keys:["ArrowDown","KeyS"]},
        {name:"leftward",keys:["ArrowLeft","KeyA"]},
        {name:"rightward",keys:["ArrowRight","KeyD"]},
        // {name:"capoeira",keys:["KeyC"]}, 
        {name:"run",keys:["KeyR"]},
        {name:"walk",keys:["Shift"]},
        {name:"jump",keys:["Space"]}
      ]}>
      <Canvas shadows>
        <Experience loaded={loaded}/>
      </Canvas>
      <Loader dataInterpolation={(v) =>{
          if(v>= 100) setLoaded(true);
          return parseInt(v) + "%";
          }} />
    </KeyboardControls>
    {!userName && <LoginOverlay/>}mn
    {userName && <TalkOverlay/>}
    </>
  );
}

export default App


function FollowShadowLight({ refLight, refCharacterRigid }){
 useFrame(() => {
  if (refCharacterRigid.current) {
    const { x: cx, y: cy, z: cz } = refCharacterRigid.current.translation()
    const cPos = new THREE.Vector3(cx, cy, cz)
    const lightRevDir = new THREE.Vector3(0, 1, 1).normalize()
    const newPos =lightRevDir.multiplyScalar(2).add(cPos)
    if(refLight.current) {
      refLight.current.target.position.copy(cPos)
      refLight.current.position.copy(newPos)
    }
  }
 })

}

function Experience(){  
  const {gl,scene} = useThree(({gl,scene})=>({gl,scene}));
  const refLight = useRef();
  const refOrbitControls = useRef(); 
  const refCharacterRigid = useRef()
  const [cast] = useAtom(castAtom);
  // const shadowCameraSize =20;

  useEffect(()=>{gl.toneMappingExposure =0.7},[gl,scene]);
  
    /* 테스트 */
    // console.log("test ", cast)
    /* end*/
  const refShadowCameraHelper = useRef();
  useEffect(() => {
    // refShadowCameraHelper.current =new THREE.CameraHelper(refLight.current.shadow.camera);
    // scene.add(refShadowCameraHelper.current)
    scene.add(refLight.current.target)
    return () => {
      // scene.remove(refShadowCameraHelper.current)
      scene.remove(refLight.current.target)
    }
  }, [refLight.current]);


  // const Colleagues =[
  //   { name: "영희", animationName: "Idle", position: [2.5, 1, 0], rotationY: DEG2RAD * 0},
  //   { name: "철수", animationName: "Run", position: [-2.5, 1, 0], rotationY: DEG2RAD * 45 },
  //   { name: "민재", animationName: "Walk", position: [0, 1, 2.5], rotationY: DEG2RAD * 228 }
  // ]


  return(
  <>
    {/* <Perf position="bottom-left"/> */}
    <OrbitControls ref={refOrbitControls} makeDefault enablePen={false}/>
    <directionalLight ref={refLight}  castShadow position={[0,1,2]} intensity={2}
        shadow-normalBias={0.1}
        shadow-bias={-0.0001}
        // shadow-mapSize={[1024 * 4, 1024 * 4]}
        // shadow-camera-near={1}
        // shadow-camera-far={25}
        // shadow-camera-top={shadowCameraSize}
        // shadow-camera-bottom={-shadowCameraSize}
        // shadow-camera-right={shadowCameraSize}
        // shadow-camera-left={-shadowCameraSize}
    />

    <Environment preset='city' />
    <Sky/>
    <SoftShadows size={2} focus ={0} samples={8}/>

    <EffectComposer disableNormalPass>
      <N8AO distanceFalloff={1} aoRadius={.5} intensity={1.4} />
      <Bloom mipmapBlur intensity={0.1} />
      {/* <TiltShift2 blur={0.1} /> */}
    </EffectComposer>

    <Physics /*debug*/>


      <RigidBody type='fixed' colliders="trimesh">
        <City/>
        {/* <mesh receiveShadow>
        <boxGeometry args={[1000,0.1,1000]}/>
        <meshStandardMaterial color="#5d6d72" />
        </mesh> */}
      </RigidBody>
      {/* <MyCharacter name="Myname" position={[0,1.5,0]}ref={refCharacterRigid} refOrbitControls = {refOrbitControls}/> */}
      {/* <Colleague name="extra" position={[2.5,1.5,0]}/>
      <Colleague name="extra" position={[3,1.5,0]}/>
      <Colleague name="extra" position={[-5,1.5,0]}/>
     */}
      {/* { Colleagues.map((item, idx) =><Colleague key={idx}{...item}/>) } */}

      {
        cast.map(item =>{
          if(item.key === socket.id){
            return <MyCharacter ref ={refCharacterRigid} refOrbitControls={refOrbitControls} {...item}/>
          }else{
            return <Colleague {...item}/>
          }
        })
      }
    
    </Physics>
     <FollowShadowLight refLight={refLight} refCharacterRigid={refCharacterRigid}></FollowShadowLight>
  </>
  );
}
