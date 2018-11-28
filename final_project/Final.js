/**
* @fileoverview This file is the main javascript file for this program. It wraps together
* the skybox and teapot drawing algorithms, the camera manipulation algorithms, and the lighting
* model. This file is where all the drawing functions are called from. This file is dependent upon
* user_commands.js, readText.js, skybox.js, render_teapot.js, teapot_0, gl-matrix-min.js, and webgl-utils.js.
*/
var a_coords_loc;       // Location of the a_coords attribute variable in the shader program.
var a_normal_loc;       // Location of a_normal attribute.

var a_coords_buffer;    // Buffer for a_coords.
var a_normal_buffer;    // Buffer for a_normal.
var index_buffer;       // Buffer for indices.

var u_diffuseColor;     // Locations of uniform variables in the shader program
var u_specularColor;
var u_specularExponent;
var u_lightPosition;
var u_modelview;
var u_projection;
var u_normalMatrix;
var u_ambient
var u_diffuse
var u_specular

var objects = [
	cube(1),
	ring( 1, 1, 1),
	uvSphere( 1, 1, 1),
	uvTorus(1,1,1,1),
 	uvCylinder(1,1,1,1,1),
];
// var object;


var rotator;                       // A TrackballRotator to implement rotation by mouse.

var lightPositions = [             // values for light position, selected by popup menu
    [0,0,0,1],
    [0,0,1,0],
    [0,1,0,0],
    [0,0,-10,1],
    [2,3,5,0],
    [0,-1,0,0],
    [-1,0,0,0],
];
var gl;
var canvas;

var shaderProgram;

// Create a place to store the texture coords for the mesh
var cubeTCoordBuffer;

// Create a place to store terrain geometry
var cubeVertexBuffer;

// Create a place to store the triangles
var cubeTriIndexBuffer;

// Create ModelView matrix
var modelview = mat4.create();

// Create Projection matrix
var projection = mat4.create();

// Create Normal matrix
var normalMatrix = mat3.create();

var mvMatrixStack = [];

// Create a place to store the texture
var cubeImage;
var cubeTexture;

// View parameters
var eyePt = vec3.fromValues(0.0,0.0,10.0);
var viewDir = vec3.fromValues(0.0,0.0,-1.0);
var up = vec3.fromValues(0.0,1.0,0.0);
var viewPt = vec3.fromValues(0.0,0.0,0.0);
var globalQuat = quat.create();

// For animation
var then =0;
var modelXRotationRadians = degToRad(0);
var modelYRotationRadians = degToRad(0);

// ready variable
ready_to_draw = false;

/**
* Function to pass the model view matrix to the shader program
* @return None
*/
function uploadModelViewMatrixToShader() {
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

/**
* Function to pass the projection matrix to the shader program
* @return None
*/
function uploadProjectionMatrixToShader() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}

/**
* Function to pass the normal matrix to the shader program
* @return None
*/
function uploadNormalMatrixToShader() {
    mat3.fromMat4(nMatrix,mvMatrix);
    mat3.transpose(nMatrix,nMatrix);
    mat3.invert(nMatrix,nMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, nMatrix);
}

/**
* Function to manipulate lighting information in shader for Phong Lighting Model
* @return None
*/
function uploadLightsToShader(loc,a,d,s) {
  gl.uniform3fv(shaderProgram.uniformLightPositionLoc, loc);
  gl.uniform3fv(shaderProgram.uniformAmbientLightColorLoc, a);
  gl.uniform3fv(shaderProgram.uniformDiffuseLightColorLoc, d);
  gl.uniform3fv(shaderProgram.uniformSpecularLightColorLoc, s);
}

/**
* Function to pass the view direction vector to the shader program
* @return None
*/
function uploadViewDirToShader(){
	gl.uniform3fv(gl.getUniformLocation(shaderProgram, "viewDir"), viewDir);
}

/**
* Function to pass the rotation matrix to the shader program so that reflections work as the teapot spins
* @return None
*/
function uploadRotateMatrixToShader(rotateMat){
	gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "uRotateMat"), false, rotateMat);
}

/**
* Routine for pushing a current model view matrix to a stack for hieroarchial modeling
* @return None
*/
function mvPushMatrix() {
    var copy = mat4.clone(mvMatrix);
    mvMatrixStack.push(copy);
}


/**
* Routine for popping a stored model view matrix from stack for hieroarchial modeling
* @return None
*/
function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
    	throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

/**
* Function which calls subroutines to upload model matricies to the shader program
* @return None
*/
function setMatrixUniforms() {
    uploadModelViewMatrixToShader();
	uploadNormalMatrixToShader();
    uploadProjectionMatrixToShader();
}

/**
* Subroutine which converts from degrees to radians
* @param {float} degrees Angle in degrees
* @return Value of angle in radians
*/
function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

/**
* Function to create a WebGL context upon startup
* @param {canvas} canvas Canvas object for the program
* @return WebGL context
*/
function createGLContext(canvas) {
	var names = ["webgl", "experimental-webgl"];
	var context = null;
	for (var i=0; i < names.length; i++) {
		try {
		  context = canvas.getContext(names[i]);
		} catch(e) {}
		if (context) {
		  break;
		}
	}
	if (context) {
		context.viewportWidth = canvas.width;
		context.viewportHeight = canvas.height;
	} else {
		alert("Failed to create WebGL context!");
	}
	return context;
}

/**
* Function to load shader from document
* @param {int} id ID to query for shader program from document
* @return Shader object for program
*/
function loadShaderFromDOM(id) {
	var shaderScript = document.getElementById(id);

	// If we don't find an element with the specified id
	// we do an early exit
	if (!shaderScript) {
		return null;
	}

	// Loop through the children for the found DOM element and
	// build up the shader source code as a string
	var shaderSource = "";
	var currentChild = shaderScript.firstChild;
	while (currentChild) {
		if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
			shaderSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, shaderSource);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

/**
* Function to pass boolean variable to shader program. The shading color is different for the
* 	teapot and the skybox, so it is necessary to switch between the settings when shading.
* @param {bool} isSkybox Variable that is True when shading the skybox or is False when shading the teapot
* @return None
*/
function switchShaders(isSkybox){
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "uIsSkybox"), isSkybox);
}

/**
* Function to set up shader programs upon startup
* @return None
*/
function setupShaders() {
	vertexShader = loadShaderFromDOM("shader-vs");
	fragmentShader = loadShaderFromDOM("shader-fs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Failed to setup shaders");
	}

	gl.useProgram(shaderProgram);

	// Enable vertex position
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	console.log("Vertex attrib: ", shaderProgram.vertexPositionAttribute);
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	// Enable vertex normals
    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	// Enable matrix manipulations
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");

	// Enable Phong Shading options
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
	shaderProgram.uniformLightPositionLoc = gl.getUniformLocation(shaderProgram, "uLightPosition");
	shaderProgram.uniformAmbientLightColorLoc = gl.getUniformLocation(shaderProgram, "uAmbientLightColor");
	shaderProgram.uniformDiffuseLightColorLoc = gl.getUniformLocation(shaderProgram, "uDiffuseLightColor");
	shaderProgram.uniformSpecularLightColorLoc = gl.getUniformLocation(shaderProgram, "uSpecularLightColor");
}

/**
* Function to setup the draw buffers for the teapot and skybox
* @return None
*/
function setupBuffers(){
    setupSkybox();
	readTextFile("teapot_0.obj", setupTeapotBuffers);
}

function installModel(modelData) {
     gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
     gl.vertexAttribPointer(a_coords_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_coords_loc);
     gl.bindBuffer(gl.ARRAY_BUFFER, a_normal_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
     gl.vertexAttribPointer(a_normal_loc, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(a_normal_loc);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
}

/**
* Function to set camera location and viewing direction, as well as facilitate the rending of the
*   skybox and teapot for each animation frame
* @return None
*/
function update( object ) {

	// gl.uniform1i(u_ambient, 1);
	// gl.uniform1i(u_diffuse, 1);
	// gl.uniform1i(u_specular, 1);

	/* Get the matrix for transforming normal vectors from the modelview matrix,
		 and send matrices to the shader program*/
	mat3.normalFromMat4(normalMatrix, modelview);

	gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
	gl.uniformMatrix4fv(u_modelview, false, modelview );
	gl.uniformMatrix4fv(u_projection, false, projection );

	/* Draw the model.  The data for the model was set up in installModel() */
	gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  //   var translateVec = vec3.create();
  //   var scaleVec = vec3.create();
	//
  //   gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  //   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//
  //   // We'll use perspective
  //   mat4.perspective(pMatrix,degToRad(90), gl.viewportWidth / gl.viewportHeight, 0.1, 200.0);
	//
  //   // Setup the scene and camera
  //   mvPushMatrix();
	// var rotateMat = mat4.create();
	// mat4.rotateY(rotateMat, rotateMat, modelYRotationRadians);
	// uploadRotateMatrixToShader(rotateMat);
  //   vec3.set(translateVec,0.0,0.0,-10.0);
  //   mat4.translate(mvMatrix, mvMatrix,translateVec);
  //   setMatrixUniforms();
	//
  //   vec3.add(viewPt, eyePt, viewDir);
  //   mat4.lookAt(mvMatrix,eyePt,viewPt,up);
	// // Setup lights
	// uploadLightsToShader([0,20,0],[0.0,0.0,0.0],[0.3,0.3,0.3],[0.3,0.3,0.3]);
	//
	// // render the skybox
  //   drawSkybox();
	// // if the teapot has been successfully read in, render the teapot
	// if (ready_to_draw){
	// 	mat4.rotateY(mvMatrix,mvMatrix,modelYRotationRadians);
	// 	drawTeapot();
	// }
	//
	// // reset mvMatrix
  //   mvPopMatrix();

}
function createProgram(gl, vertexShaderID, fragmentShaderID) {
    function getTextContent( elementID ) {
            // This nested function retrieves the text content of an
            // element on the web page.  It is used here to get the shader
            // source code from the script elements that contain it.
        var element = document.getElementById(elementID);
        var node = element.firstChild;
        var str = "";
        while (node) {
            if (node.nodeType == 3) // this is a text node
                str += node.textContent;
            node = node.nextSibling;
        }
        return str;
    }
    try {
        var vertexShaderSource = getTextContent( vertexShaderID );
        var fragmentShaderSource = getTextContent( fragmentShaderID );
    }
    catch (e) {
        throw "Error: Could not get shader source code from script elements.";
    }
    var vsh = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource(vsh,vertexShaderSource);
    gl.compileShader(vsh);
    if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
     }
    var fsh = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
       throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog,vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
       throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}
function initGL() {
    var prog = createProgram(gl,"vshader-source","fshader-source");
    gl.useProgram(prog);
    a_coords_loc =  gl.getAttribLocation(prog, "a_coords");
    a_normal_loc =  gl.getAttribLocation(prog, "a_normal");
    u_modelview = gl.getUniformLocation(prog, "modelview");
    u_projection = gl.getUniformLocation(prog, "projection");
    u_normalMatrix =  gl.getUniformLocation(prog, "normalMatrix");
    u_lightPosition=  gl.getUniformLocation(prog, "lightPosition");
    u_diffuseColor =  gl.getUniformLocation(prog, "diffuseColor");
    u_specularColor =  gl.getUniformLocation(prog, "specularColor");
    u_specularExponent = gl.getUniformLocation(prog, "specularExponent");
    // u_ambient = gl.getUniformLocation(prog, "ambient");
    // u_diffuse = gl.getUniformLocation(prog, "diffuse");
    // u_specular = gl.getUniformLocation(prog, "specular");

    a_coords_buffer = gl.createBuffer();
    a_normal_buffer = gl.createBuffer();
    index_buffer = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);

    // gl.uniform1i(u_ambient, 0);
    // gl.uniform1i(u_diffuse, 0);
    // gl.uniform1i(u_specular, 0 );

    gl.uniform3f(u_specularColor, 0.5, 0.5, 0.5);
    gl.uniform4f(u_diffuseColor, 1, 1, 1, 1);
    gl.uniform1f(u_specularExponent, 10);
    gl.uniform4f(u_lightPosition, 0, 0, 0, 1);
}


/**
* Function to animate the scene by spinning the teapot around its y axis.
* @return None
*/
// function animate() {
//     if (then==0)
//     {
//     	then = Date.now();
//     }
//     else
//     {
// 		now=Date.now();
// 		// Convert to seconds
// 		now *= 0.001;
// 		// Subtract the previous time from the current time
// 		var deltaTime = now - then;
// 		// Remember the current time for the next frame.
// 		then = now;
//
// 		// Animate the Rotation
// //		modelYRotationRadians += 0.01;
//     }
// }

/**
* Function to verify if a value is a power of 2 or not
* @param {int} value Value to determine whether or not it is a power of 2
* @return {boolean} Boolean indicating whether a value is a power of 2 (true) or not (false)
*/
function isPowerOf2(value) {
	return (value & (value - 1)) == 0;
}

function draw(){
	gl.clearColor(0.15,0.15,0.3,1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mat4.perspective(projection, Math.PI/5,1,10,30);

	modelview = rotator.getViewMatrix();
	// gl = createGLContext(canvas);
	// gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// gl.enable(gl.DEPTH_TEST);

	// set up event listener for keystrokes
	//document.onkeydown = handleKeyDown;

	// setup pipeline to be able to render scene
	drawCar( modelview, [0,-0.5,7], [0.5,0.5,0.5]);
	drawGround( modelview, [ 0,-0.4,0], [2,2,2] );
	drawTree( modelview, null, null, null, null, null, null, null, null );
	drawPole(modelview, null, null, null, null, null, null, null, null);
}
/**
* Function for doing the initialization work of the program and kicking off
*   the animation callback
* @return None
*/
function startup() {
	try {
			canvas = document.getElementById("myGLCanvas");
			gl = canvas.getContext("webgl") ||
											 canvas.getContext("experimental-webgl");
			if ( ! gl ) {
					throw "Browser does not support WebGL";
			}
	}
	catch (e) {
			document.getElementById("canvas-holder").innerHTML =
					"<p>Sorry, could not get a WebGL graphics context.</p>";
			return;
	}
	try {
			initGL();  // initialize the WebGL graphics context
	}
	catch (e) {
			document.getElementById("canvas-holder").innerHTML =
					"<p>Sorry, could not initialize the WebGL graphics context:" + e + "</p>";
			return;
	}
	rotator = new TrackballRotator(canvas, draw, 20, [0,10,10], [0,1,0]);
	draw();
	//document.getElementById("my_gl").onchange = draw;

	// gl.uniform4fv(u_lightPosition, lightPositions[0]);
	// draw();
	//
	// gl.uniform1f(u_specularExponent, 10);
	// draw();

	//setupShaders();
	//setupBuffers();
	//setupCubeMap();

	// kick off the drawing loop
	//tick();
}

/**
* Callback function to perform draw each frame
* @return None
*/
// function tick() {
//     requestAnimFrame(tick);
//     draw();
//     animate();
// }
