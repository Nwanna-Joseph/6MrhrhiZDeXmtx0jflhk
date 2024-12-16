import * as THREE from "three";
import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  HemisphereLight,
  LinearToneMapping,
  LoadingManager,
  PMREMGenerator,
  PointsMaterial,
  REVISION,
  Vector3
} from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {DRACOLoader, KTX2Loader, RoomEnvironment} from "three/addons";
import {MeshoptDecoder} from "three/addons/libs/meshopt_decoder.module.js";


export function createScene(scene_data , width, height){
  const copy = scene_data
  const scene = new THREE.Scene();
  //if background
  const background = copy.environment.background
  scene.background = new Color(background.r, background.g, background.b)


  const fov = copy.camera.fov
  const aspect = width/ height
  const nearOcclusion = copy.camera.nearOcclusion
  const farOcclusion = copy.camera.farOcclusion
  const camera = new THREE.PerspectiveCamera(fov, aspect, nearOcclusion, farOcclusion);
  const cameraPosition = copy.camera.position
  camera.position.x = cameraPosition.x
  camera.position.y = cameraPosition.y
  camera.position.z = cameraPosition.z

  const lights = copy.lights
  lights.forEach( light => {

    let info = false

    if(light.type === "hemishpere"){
      info = new HemisphereLight();
    }else if(light.type === "ambient"){
      info = new AmbientLight('#FFFFFF', 0.3);
    }else if(light.type === "directional"){
      info = new DirectionalLight('#FFFFFF', 0.8 * Math.PI);
      info.position.set(0.5, 0, 0.866); // ~60º
    }

    if(info){
      info.name = light.unique_name;
      if(light.parent === "scene"){
        scene.add(info);
      }else if(light.parent === "camera"){
        camera.add(info);
      }
    }else{
      console.log("error", light)
    }
  })

  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer({ antialias: true }); //destroy and recreate and bind to new target, TODO
  renderer.setClearColor(0xcccccc);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  renderer.toneMapping = Number(LinearToneMapping);
  renderer.toneMappingExposure = Math.pow(2, 0.0);

  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.screenSpacePanning = true;

  return {renderer, scene, camera}
}

function setSceneObjects(scene, gameObjects){
  Object.keys(gameObjects).forEach( (key,position) => {
    // console.log(key, gameObjects[key])
    // gameObjectMapCache[key] = get3JSObject(gameObjects[key])
    // gameObjectsCache.push(gameObjectMapCache[key])
    scene.add()
  } )
}

export function addObjects(scene, gameObjects, constructedLookup){
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
  constructedLookup["mesh_01"] = new THREE.Mesh(geometry, material)
  scene.add(constructedLookup["mesh_01"])
}

