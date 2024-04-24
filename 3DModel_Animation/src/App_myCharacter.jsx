import { Canvas,useLoader } from '@react-three/fiber';
import './App.css';
import*as THREE from'three'
import{ OrbitControls,useAnimations,useGLTF,PerspectiveCamera} from'@react-three/drei';
import{ Perf} from'r3f-perf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useRef } from 'react';
import { useControls } from 'leva';

 function App() {
 return(
 <Canvas shadows>
  <Experience/>
 </Canvas>
 );
 }
 export default App;

 function Experience() {
  // const model = useLoader(GLTFLoader, "./books_with_magnifier.glb");
  const model = useGLTF('./books_with_magnifier.glb');
  // console.log(model)



  const {action} = useControls({action:"Idle"});


  return<>
  <Perf position="top-left"/>
  <ambientLight intensity={0.5}/>
  <directionalLight position={[1, 2, 3]}intensity={4}castShadow/>
  <OrbitControls makeDefault/>
  <group>

    {/* <primitive object={model.scene} scale={10} position-y={-0.7} /> */}
    <TreeBoy act={action} scale={2} position-y={-0.8} />
    <mesh receiveShadow position-y={-1} rotation-x={THREE.MathUtils.degToRad(-90)}scale={10}>
      <circleGeometry/>
      <meshPhongMaterial color="#5D6D7E"/>
    </mesh>
  </group>
  </>
  }


  function TreeBoy(props) {
    const treeBoy = useGLTF("./myCharacter.glb")
    const animations = useAnimations(treeBoy.animations, treeBoy.scene);
    console.log(animations);
    useEffect(() => {
    treeBoy.scene.traverse((obj) => {
      if(obj.isMesh) {
        obj.castShadow = true
        }
      })
      
      stopAllActions();

      let bact = props.act;

      console.log(bact);

    
      const boyAction = animations.actions[bact];

      boyAction.play();
      console.log(animations.actions[bact]);
      
      
      

    }, [treeBoy,props.act]
    )

    let actionArr = ["Idle","Capoera","FastRun","Ninja","Walk"];
    function stopAllActions(){
      actionArr.forEach((i)=>{
        animations.actions[i].stop();
      })
      
    }


    return <primitive object={treeBoy.scene} {...props} />
    }
    
