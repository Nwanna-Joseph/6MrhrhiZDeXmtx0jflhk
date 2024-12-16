import * as gameObjects from './assets/scenes.json' //game.glb
import * as global_var from './assets/variables.json'
import {constructedGameObjects} from "./internal/game_object_data";

import {createScene, addObjects} from "./internal/init";
import onGameUpdate from "./app/update";
import onInit from "./app/init/init";

function initScene(_scenes){

  const scene_data = _scenes.scenes.data[_scenes.scenes.selected].init

  const {renderer, scene, camera}  = createScene(scene_data, 1000, 600)



  const scr = {scene, camera, renderer}

  function animate () {
    onGameUpdate(constructedGameObjects,{}, global_var, scr)
    renderer.render(scene, camera);
  }

  addObjects(scene, gameObjects, constructedGameObjects)

  onInit(gameObjects, constructedGameObjects, {}, global_var, scr)
  document.body.appendChild( renderer.domElement );
  renderer.setAnimationLoop( animate );

}

initScene(gameObjects)
