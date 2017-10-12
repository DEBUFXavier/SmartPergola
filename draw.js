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

        // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere_repère", 16, 2, scene);

        // return the created scene
        return scene;
    }

    var createMaterial = function(scene) {
        var material = {
            "grass": new BABYLON.StandardMaterial('grass', scene),
            "gray_metal": new BABYLON.StandardMaterial('gray_metal', scene),
            "glass": new BABYLON.StandardMaterial('glass', scene),
        }

        material.grass.diffuseTexture = new BABYLON.Texture("img/textures/grass.jpg", scene);
        material.grass.specularColor = new BABYLON.Color3(0.0,0.0,0.0);
        material.grass.diffuseTexture.vScale = 50.0;
        material.grass.diffuseTexture.uScale = 50.0;

        material.gray_metal.diffuseColor = new BABYLON.Color3(0.2,0.2,0.2);
        material.gray_metal.emissiveColor = new BABYLON.Color3(0.2,0.2,0.2);
        material.gray_metal.specularColor = new BABYLON.Color3(0.8,0.8,0.8);

        material.glass.diffuseColor = new BABYLON.Color3(0.0,0.0,0.1);
        material.glass.emissiveColor = new BABYLON.Color3(0.0,0.0,0.1);
        material.glass.specularColor = new BABYLON.Color3(0.8,0.8,0.8);
        material.glass.backFaceCulling = false;
        material.glass.alpha = 0.4;

        return material;
    }

    var createGround = function(scene) {
        // create a built-in "ground" shape; its constructor takes 5 params: name, width, height, subdivisions and scene
        var ground = BABYLON.Mesh.CreateGround('ground_1', 60, 60, 2, scene);
        ground.material = material.grass;
    }

    var createConservatory = function(scene) {
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
            cube.material = material.gray_metal;
        });

        // create windows
        var glass_scaling = new BABYLON.Vector3(1.0, 2.3, 0.01);
        var glass_params = [
            {"position": new BABYLON.Vector3(-3.0+1.0*1.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},
            {"position": new BABYLON.Vector3(-3.0+1.0*2.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},
            {"position": new BABYLON.Vector3(-3.0+1.0*3.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},
            {"position": new BABYLON.Vector3(-3.0+1.0*4.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},
            {"position": new BABYLON.Vector3(-3.0+1.0*5.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},
            {"position": new BABYLON.Vector3(-3.0+1.0*6.0-1.0/2.0, 2.5/2.0, 3.0), "rotation": new BABYLON.Vector3(0,0,0)},

            {"position": new BABYLON.Vector3(-3.0, 2.5/2.0, 3.0-1.0*0.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},
            {"position": new BABYLON.Vector3(-3.0, 2.5/2.0, 3.0-1.0*1.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},
            {"position": new BABYLON.Vector3(-3.0, 2.5/2.0, 3.0-1.0*2.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},

            {"position": new BABYLON.Vector3( 3.0, 2.5/2.0, 3.0-1.0*0.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},
            {"position": new BABYLON.Vector3( 3.0, 2.5/2.0, 3.0-1.0*1.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},
            {"position": new BABYLON.Vector3( 3.0, 2.5/2.0, 3.0-1.0*2.0-1.0/2.0), "rotation": new BABYLON.Vector3(0,Math.PI/2,0)},
        ];

        glass_params.forEach(function(e, i){
            // Glass
            var glass = BABYLON.Mesh.CreateBox('consercatory_windows_' + i, 1, scene);
            glass.position = e.position;
            glass.scaling  = glass_scaling;
            glass.material = material.glass;
            glass.rotation = e.rotation;

            // Glass' armature
            var glass_armature_1 = BABYLON.Mesh.CreateBox('consercatory_windows_' + i + '_armature_1', 1, scene); // horizontal bottom
            glass_armature_1.parent = glass;
            glass_armature_1.scaling = new BABYLON.Vector3(1.0,0.01,3.0);
            glass_armature_1.position= new BABYLON.Vector3(0.0,-0.5,0.0);

            var glass_armature_2 = BABYLON.Mesh.CreateBox('consercatory_windows_' + i + '_armature_2', 1, scene); // horizontal top
            glass_armature_2.parent = glass;
            glass_armature_2.scaling = new BABYLON.Vector3(1.0,0.01,3.0);
            glass_armature_2.position= new BABYLON.Vector3(0.0,0.5,0.0);

            var glass_armature_3 = BABYLON.Mesh.CreateBox('consercatory_windows_' + i + '_armature_3', 1, scene); // vertical right
            glass_armature_3.parent = glass;
            glass_armature_3.scaling = new BABYLON.Vector3(0.02,1.0,3.0);
            glass_armature_3.position= new BABYLON.Vector3(0.5,0.0,0.0);

            var glass_armature_4 = BABYLON.Mesh.CreateBox('consercatory_windows_' + i + '_armature_4', 1, scene); // vertical left
            glass_armature_4.parent = glass;
            glass_armature_4.scaling = new BABYLON.Vector3(0.02,1.0,3.0);
            glass_armature_4.position= new BABYLON.Vector3(-0.5,0.0,0.0);
        });

        // create glass roof

        var paths = [
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-3.0, 2.5, 0.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-3.0, 2.5, 1.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-3.0, 2.5, 2.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-3.0, 2.5, 3.0)],

            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-3.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-2.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3(-1.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 0.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 1.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 2.0, 2.5, 3.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 3.0, 2.5, 3.0)],

            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 3.0, 2.5, 0.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 3.0, 2.5, 1.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 3.0, 2.5, 2.0)],
            [new BABYLON.Vector3(0.0, 3.0, 0.0), new BABYLON.Vector3( 3.0, 2.5, 3.0)],
        ];

        paths.forEach(function(e, i){
            var lines = BABYLON.Mesh.CreateLines("conservatory_roof_armature_" + i, e, scene); // draw edges
        });

        var ribbon = BABYLON.Mesh.CreateRibbon("consercatory_roof", paths, false, false, 0, scene); // draw faces
        ribbon.material = material.glass;

    }

    // call the createScene function
    var scene = createScene();

    var material = createMaterial(scene);

    // create ground
    createGround(scene);

    // create conservatory
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
