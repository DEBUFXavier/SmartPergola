window.addEventListener('DOMContentLoaded', function() {

  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);
console.log('in pergolas');
var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 1, 15, new BABYLON.Vector3(15, 15, 0), scene);
	camera.maxZ = 100;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

	var ground = BABYLON.Mesh.CreatePlane('ground', 100, scene);
	ground.position.y = -7;
	ground.rotation.x = Math.PI/2;

	//var material_sphere = new BABYLON.StandardMaterial('spheremat', scene);
	//material_sphere.diffuseColor = BABYLON.Color3.Red();
  //  material_sphere.diffuseTexture = new BABYLON.Texture("textures/tree.png", scene);
    //material_sphere.diffuseTexture.hasAlpha = false;
	//material_sphere.backFaceCulling = false;
	//material_sphere.useAlphaFromDiffuseTexture = true;
	//material_sphere.opacityTexture = material_sphere.diffuseTexture;

	var material_columns = new BABYLON.StandardMaterial('columnsmat', scene);
	//material_columns.diffuseColor = BABYLON.Color3.Yellow();
	/*var fireTexture = new BABYLON.FireProceduralTexture("fire", 256, scene);
    material_columns.emissiveTexture = fireTexture;
    material_columns.opacityTexture = fireTexture;
*/
	var material_stairs = new BABYLON.StandardMaterial('stairsmat', scene);
	material_stairs.diffuseColor = BABYLON.Color3.Blue();
	material_stairs.emissiveColor = new BABYLON.Color3(0.1,0.1,0.1);
	material_stairs.alpha = 0.4;


	//4 murs de la pergolas:::

  var cube1 = BABYLON.Mesh.CreateBox('cube1', 0.3, scene);
		cube1.position.z = -10;
		cube1.scaling.x = 70;
		cube1.scaling.y = cube1.scaling.x;
		cube1.material = material_stairs;
    var cube2 = BABYLON.Mesh.CreateBox('cube2', 0.3, scene);
  		cube2.position.z = 10;
  		cube2.scaling.x = 70;
  		cube2.scaling.y = cube2.scaling.x;
  		cube2.material = material_stairs;
      var cube3 = BABYLON.Mesh.CreateBox('cube3', 0.3, scene);
    		cube3.position.x = 10;
    		cube3.scaling.z = 70;
    		cube3.scaling.y = cube3.scaling.z;
    		cube3.material = material_stairs;
        var cube4 = BABYLON.Mesh.CreateBox('cube4', 0.3, scene);
      		cube4.position.x = -10;
      		cube4.scaling.z = 70;
      		cube4.scaling.y = 105;
      		cube4.material = material_stairs;
//murs pour le store
var triangle1 = [ new BABYLON.Vector3(0,-10,0),
                    new BABYLON.Vector3(-70,-70,0),
                    new BABYLON.Vector3(-70,-105,0),
              ];
              var triangle2 = [ new BABYLON.Vector3(0,10,0),
                                  new BABYLON.Vector3(-70,70,0),
                                  new BABYLON.Vector3(-70,105,0),
                            ];

                            var poly_tri = new BABYLON.PolygonMeshBuilder("polytri", triangle1, scene);
                            var polygon1 = poly_tri.build(null,1);
                            var poly_tri2 = new BABYLON.PolygonMeshBuilder("polytri2", triangle2, scene);
                            var polygon2 = poly_tri2.build(null,1);
    //polygon.rotation = new BABYLON.Vector3(Math.PI/2,Math.PI/2,0);

    polygon1.material =material_stairs;
    polygon2.material =material_stairs;
//Store



    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    //particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
    particleSystem.emitter = new BABYLON.Vector3(0, 2, 0);
    particleSystem.minEmitBox = new BABYLON.Vector3.Zero();
    particleSystem.maxEmitBox = new BABYLON.Vector3.Zero();
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 0.7;
    particleSystem.maxLifeTime = 0.9;
    particleSystem.emitRate = 1500;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.gravity =    new BABYLON.Vector3(0, -9.81, 0);
    particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
    particleSystem.direction2 = new BABYLON.Vector3( 1, 1,  1);
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;
    particleSystem.minEmitPower = 3;
    particleSystem.maxEmitPower = 4;
    particleSystem.updateSpeed = 0.005;
    particleSystem.start();



	// RENDER DEPTH

	var depth_renderer = scene.enableDepthRenderer();
	//scene.disableDepthRenderer();
	var display_depth = false;

	var test =
		"?#ifdef GL_ES\n"+
		"precision highp float;\n"+
		"#endif\n\n"+
		"varying vec2 vUV;\n"+
		"uniform sampler2D textureSampler;\n\n"+
		"void main(void)\n{\n"+
		"vec4 depth = texture2D(textureSampler, vUV);\n"+
		"gl_FragColor = vec4(depth.r, depth.r, depth.r, 1.0);\n"+
		"}";

	BABYLON.Effect.ShadersStore['depthbufferPixelShader'] =
	"#ifdef GL_ES\nprecision highp float;\n#endif\n\nvarying vec2 vUV;\nuniform sampler2D textureSampler;\n\nvoid main(void)\n{\nvec4 depth = texture2D(textureSampler, vUV);\ngl_FragColor = vec4(depth.r, depth.r, depth.r, 1.0);\n}";

	//alert(test + '\n\n' + BABYLON.Effect.ShadersStore['depthbufferPixelShader']);

	var post_process = new BABYLON.PostProcess('depth_display', 'depthbuffer', null, null, 1.0, null, null, engine);
	//post_process.activate(camera, depth_renderer.getDepthMap());
	post_process.onApply = function() {
		this._effect._bindTexture("textureSampler", depth_renderer.getDepthMap().getInternalTexture());
	}


	// switch normal render & depth render with space press
	document.addEventListener("keydown", function(evt) {
		if(evt.keyCode == 120) {
			display_depth = !display_depth;
		}
		if(display_depth) {
			camera.attachPostProcess(post_process);
		} else {
			camera.detachPostProcess(post_process);
		}
	} );

  return scene;
}
// call the createScene function
         var scene = createScene();

         // run the render loop
         engine.runRenderLoop(function(){
             scene.render();
         });

         // the canvas/window resize event handler
         window.addEventListener('resize', function(){
             engine.resize();
         });
});
