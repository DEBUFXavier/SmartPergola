window.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);
    console.log('in');

    var createScene = function() {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        //var camera = new BABYLON.FreeCamera('camera_1', new BABYLON.Vector3(0, 5,-10), scene);
        // Parameters : name, alpha, beta, radius, target, scene
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0.5, 0.5, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(canvas, false);
        // set zoom on scroll more accurate
        camera.wheelPrecision = 50; 

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

    var createConservatory = function(scene) {
        // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // create armature
        var armature = [
            // 4 pieds
            {"sx": 0.1, "sy": 2.5, "sz": 0.1, "px": 3.0, "py": 2.5/2.0, "pz": 0.0},
            {"sx": 0.1, "sy": 2.5, "sz": 0.1, "px": 3.0, "py": 2.5/2.0, "pz": 3.0},
            {"sx": 0.1, "sy": 2.5, "sz": 0.1, "px":-3.0, "py": 2.5/2.0, "pz": 0.0},
            {"sx": 0.1, "sy": 2.5, "sz": 0.1, "px":-3.0, "py": 2.5/2.0, "pz": 3.0},
            // 
            {"sx": 6.0, "sy": 0.1, "sz": 0.1, "px": 0.0, "py": 2.5-0.1/2.0, "pz": 3.0},
            {"sx": 6.0, "sy": 0.1, "sz": 0.1, "px": 0.0, "py": 2.5-0.1/2.0, "pz": 0.0},
            {"sx": 6.0, "sy": 0.1, "sz": 0.1, "px": 0.0, "py": 0.0+0.1/2.0, "pz": 3.0},
            {"sx": 6.0, "sy": 0.1, "sz": 0.1, "px": 0.0, "py": 0.0+0.1/2.0, "pz": 0.0},
            //
            {"sx": 0.1, "sy": 0.1, "sz": 3.0, "px": 3.0, "py": 2.5-0.1/2.0, "pz": 3.0/2.0},
            {"sx": 0.1, "sy": 0.1, "sz": 3.0, "px": 3.0, "py": 0.0+0.1/2.0, "pz": 3.0/2.0},
            {"sx": 0.1, "sy": 0.1, "sz": 3.0, "px":-3.0, "py": 2.5-0.1/2.0, "pz": 3.0/2.0},
            {"sx": 0.1, "sy": 0.1, "sz": 3.0, "px":-3.0, "py": 0.0+0.1/2.0, "pz": 3.0/2.0},
        ];

        armature.forEach(function(e, i){
            var cube = BABYLON.Mesh.CreateBox('consercatory_armature_' + i, 1, scene);
            cube.scaling.x = e.sx;
            cube.scaling.y = e.sy;
            cube.scaling.z = e.sz;
            cube.position.x = e.px;
            cube.position.y = e.py;
            cube.position.z = e.pz;
        });


        //murs pour le store
        var triangle1 = [ 
            new BABYLON.Vector3(0,-10,0),
            new BABYLON.Vector3(-70,-70,0),
            new BABYLON.Vector3(-70,-105,0),
        ];
        var triangle2 = [
            new BABYLON.Vector3(0,10,0),
            new BABYLON.Vector3(-70,70,0),
            new BABYLON.Vector3(-70,105,0),
        ];
    }

    // call the createScene function
    var scene = createScene();

    var material = createMaterial(scene);

    createGround(scene);
    createConservatory(scene);

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});
