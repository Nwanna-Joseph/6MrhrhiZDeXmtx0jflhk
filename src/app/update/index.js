export default function onGameUpdate(gameObjects, input_devices, globalVars, scr){
    // console.log(gameObjects, globalVars, scr) //performance test
    if(globalVars['rightPressed']){
        gameObjects["mesh_01"].position.x += 0.01
        //getGLTF(gameObjects["mesh_01"]).position.x += 0.01
    }
    if(globalVars['leftPressed']){
        gameObjects["mesh_01"].position.x -= 0.01
    }

}