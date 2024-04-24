import { OrbitControls } from 'three/examples/jsm/Addons.js';
import './style.css'
import * as THREE from "three"

class App {
 constructor(){
  console.log("hello three.js");
  this._setupTreeJs();
  this._setupCamera();
  this._setupLight();
  this._setupModel();
  this._setupEvents();
  this._setupControls();
 }

 _setupTreeJs(){
  const div = document.querySelector("#app");
  this._div = div;

  const renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  div.appendChild(renderer.domElement);
  this._renderer = renderer;

  const scene = new THREE.Scene();
  this._scene = scene;

 }

 _setupCamera(){
  const camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight,
    0.1,
    10
  );

  let c_x = 0;
  let c_y = 0;
  let c_z = 3;
  camera.position.set(c_x,c_y,c_z);
  this._camera = camera;
 }

 _setupLight(){
  let l_color = 0xffffff;
  let l_intensity = 1;

  let l_x_position = -1;
  let l_y_position = 2;
  let l_z_position = 4;
  const light = new THREE.DirectionalLight(l_color, l_intensity);
  light.position.set(l_x_position,l_y_position,l_z_position)

  this._scene.add(light);

 }

 _setupModel(){

  let g_x = 1;
  let g_y = 1;
  let g_z = 1;

  let m_color = 0x44aa88;

  const geometry = new THREE.BoxGeometry(g_x,g_y,g_z);
  const material = new THREE.MeshPhongMaterial({color :m_color});
  const cube = new THREE.Mesh(geometry,material);
  this._scene.add(cube);
 }

_setupControls(){
  this._orbitControls = new OrbitControls(this._camera, this._div);
}

 _setupEvents(){
  this.resize();
  this._clock = new THREE.Clock();
  requestAnimationFrame(this.render.bind(this));  

}

render(){
  this._renderer.render(this._scene,this._camera);
  this.update();
  requestAnimationFrame(this.render.bind(this));  
}
resize(){
  const width = this._div.clientWidth;
  const height = this._div.clientHeight;

  this._camera.aspect = width/height;
  this._camera.updateProjectionMatrix();
  this._renderer.setSize(width,height);
}

update(){
  const delta = this._clock.getDelta();
  this._orbitControls.update();
}


}


window.onload = () =>{
  new App();
}



