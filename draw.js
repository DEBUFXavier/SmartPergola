window.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    console.log('in');

    var createScene = function() {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new BABYLON.FreeCamera('camera_1', new BABYLON.Vector3(0, 5,-10), scene);
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light_1', new BABYLON.Vector3(0,1,0), scene);

        // return the created scene
        return scene;
    }

    var createMaterial = function(scene) {
        var material = {
            "grass": new BABYLON.StandardMaterial('grass', scene),
        }

        material.grass.diffuseTexture = new BABYLON.Texture("img/textures/grass.jpg", scene);
        material.grass.diffuseTexture.vScale = 50.0;
        material.grass.diffuseTexture.uScale = 50.0;

        return material;
    }

    var createGround = function(scene) {
        // create a built-in "ground" shape; its constructor takes 5 params: name, width, height, subdivisions and scene
        var ground = BABYLON.Mesh.CreateGround('ground_1', 60, 60, 2, scene);
        ground.material = material.grass;
    }

    // call the createScene function
    var scene = createScene();

    var material = createMaterial(scene);

    createGround(scene);

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});
