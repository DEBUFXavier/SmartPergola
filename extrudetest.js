var showAxis = function(size) {
   var makeTextPlane = function(text, color, size) {
   var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
   dynamicTexture.hasAlpha = true;
   dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
   var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
   plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
   plane.material.backFaceCulling = false;
   plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
   plane.material.diffuseTexture = dynamicTexture;
   return plane;
   };

   var axisX = BABYLON.Mesh.CreateLines("axisX", [
     BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
     new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
     ], scene);
   axisX.color = new BABYLON.Color3(1, 0, 0);
   var xChar = makeTextPlane("X", "red", size / 10);
   xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
   var axisY = BABYLON.Mesh.CreateLines("axisY", [
       BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0),
       new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
       ], scene);
   axisY.color = new BABYLON.Color3(0, 1, 0);
   var yChar = makeTextPlane("Y", "green", size / 10);
   yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
   var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
       BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
       new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
       ], scene);
   axisZ.color = new BABYLON.Color3(0, 0, 1);
   var zChar = makeTextPlane("Z", "blue", size / 10);
   zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
 };



 // shape
 var shape = [
   new BABYLON.Vector3(1, 1, 0),
   new BABYLON.Vector3(0.2, 1.3, 0),
   new BABYLON.Vector3(0, 1, 0),
   new BABYLON.Vector3(-0.2, 1.3, 0),
   new BABYLON.Vector3(-1, 1, 0),
 ];

 //var shapeline = BABYLON.Mesh.CreateLines("sl", shape, scene);
 //shapeline.color = BABYLON.Color3.Yellow();

 var path = [];
 for(var i = 0; i < 100; i++) {
   var point = new BABYLON.Vector3(i / 5 - 10, 0, 0);
   path.push(point);
 }

 var pathline = BABYLON.Mesh.CreateLines("pl", path, scene);
 pathline.color = BABYLON.Color3.Magenta();

 var myScale = function(i, distance) {
   //var scale = -Math.abs(2 * Math.sin(i / 10));
   var scale = i / 70 + 1;
   return scale;
 };

 var myRotation = function(i, distance) {
   return 0;
 };

 var extruded = BABYLON.Mesh.ExtrudeShapeCustom("extruded", shape, path, myScale, myRotation, false, false, 0, scene);
 extruded.material = mat;

 showAxis(5);
 
