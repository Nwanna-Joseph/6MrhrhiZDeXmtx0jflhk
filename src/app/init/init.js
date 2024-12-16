

export default function onInit(gameObjects, constructedGameObjects, input_devices, globalVars, scr){
    // Create a new URL object
//   const url = new URL(window.location.href);
//
// // Get a specific query parameter
//   const element = url.searchParams.get('target_element');
//   const paramValue = url.searchParams.get('scene_json');
//
//   console.log(element, paramValue)
//
//   console.log(scene, global_var)


    function keyDownHandler(event) {
        if (event.code === "ArrowRight") {
            globalVars['rightPressed'] = true
        } else if (event.code === "ArrowLeft") {
            globalVars['leftPressed'] = true
        }
        if (event.code === "ArrowDown") {
            globalVars['downPressed'] = true
        } else if (event.code === "ArrowUp") {
            globalVars['upPressed'] = true
        }
    }
    function keyUpHandler(event) {
        if (event.code === "ArrowRight") {
            globalVars['rightPressed'] = false
        } else if (event.code === "ArrowLeft") {
            globalVars['leftPressed'] = false
        }
        if (event.code === "ArrowDown") {
            globalVars['downPressed'] = false
        } else if (event.code === "ArrowUp") {
            globalVars['upPressed'] = false
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

}