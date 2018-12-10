/**
 * @fileoverview This file is the main javascript file for this program. It wraps together
 * the skybox and teapot drawing algorithms, the camera manipulation algorithms, and the lighting
 * modelView. This file is where all the drawing functions are called from. This file is dependent upon
 * user_commands.js, readText.js, skybox.js, render_teapot.js, teapot_0, gl-matrix-min.js, and webgl-utils.js.
 */
var gl;
var canvas;
var readyDraw;


var a_color_buffer;
var a_coords_buffer; // Buffer for a_coords.
var a_normal_buffer; // Buffer for a_normal.
var index_buffer; // Buffer for indices.

var shader; // shader program


//////location variables
var a_coords_loc;
var a_normal_loc;
var a_color_loc;

var u_modelView;
var u_projection;
var u_normalMatrix;
var u_viewMatrix;

var u_ambientColor;
var u_diffuseColor;
var u_specularColor;
var u_specularExponent;

var u_isHeadLight;
var leftLightPosition_loc;
var rightLightPosition_loc;
var lightDirectionLocation;
var limitLocation;

var u_isMoon;
var u_isMoonDown;
var u_isHeadLight;


///////lightColor////////

var ambientColor = [0, 0, 0];
var diffuseColor = [0, .1, .1];
var specularColor = [0.5, 0.5, 0.5];
var specularExponent = 5;


/////////

var rotator; // A TrackballRotator to implement rotation by mouse.

// Create modelView matrix
var modelView = mat4.create();

// Create Projection matrix
var projection = mat4.create();

// Create Normal matrix
var normalMatrix = mat3.create();

var viewMatrix = mat4.create();
var viewProjectionMatrix = mat3.create();

// // View parameters
// var eyePt = vec3.fromValues(0.0, 0.0, 10.0);
var viewDir = vec3.fromValues(0.0, 10., 10.);
var up = vec3.fromValues(0.0, 1.0, 0.0);
// var viewPt = vec3.fromValues(0.0, 0.0, 0.0);
// var globalQuat = quat.create();

// For animation
var then = 0;
var moonDeg = degToRad(0);
var lightposition = [0, 0, 0, 1.0];
var carPosition = [0, -0.5, 7];
var viewDistance = 20;

/////spot light
var lightOn = 1;

var limit = degToRad(90);

var carLightPosition_loc;
var x = carPosition[0];
var y = carPosition[1];
var z = carPosition[2];

var leftLightPosition = vec4.create();
var rightLightPosition = vec4.create();
var carLightDirection = vec4.create();
var moonDown = 0;

/////Point LIght
var pointLightPosition_loc;
var isPointLight_loc;
var isPointLight = 0.;
var pointLightPosition = vec3.create();

var test = 0;


function initGL() {
    shader = createProgram(gl, "vshader-source", "fshader-source");
    gl.useProgram(shader);


    a_coords_loc = gl.getAttribLocation(shader, "a_coords");
    a_normal_loc = gl.getAttribLocation(shader, "a_normal");
    u_modelView = gl.getUniformLocation(shader, "modelView");
    u_projection = gl.getUniformLocation(shader, "projection");
    u_normalMatrix = gl.getUniformLocation(shader, "normalMatrix");
    u_view = gl.getUniformLocation(shader, "viewMatrix");

    /////lighting setup
    u_lightPosition = gl.getUniformLocation(shader, "lightPosition");
    u_diffuseColor = gl.getUniformLocation(shader, "diffuseColor");
    u_specularColor = gl.getUniformLocation(shader, "specularColor");
    u_specularExponent = gl.getUniformLocation(shader, "specularExponent");
    u_ambientColor = gl.getUniformLocation(shader, "ambientColor");
    u_isHeadLight = gl.getUniformLocation(shader, "isHeadLight");

    u_isMoon = gl.getUniformLocation(shader, "isMoon");
    u_isMoonDown = gl.getUniformLocation(shader, "isMoonDown");
    u_isGround = gl.getUniformLocation(shader, "isGround");
    isPointLight_loc = gl.getUniformLocation(shader, "isPointLight");
    pointLightPosition_loc = gl.getUniformLocation(shader, "pointLightPosition");
    leftLightPosition_loc = gl.getUniformLocation(shader, "leftLightPosition");
    rightLightPosition_loc = gl.getUniformLocation(shader, "rightLightPosition");

    a_coords_buffer = gl.createBuffer();
    a_normal_buffer = gl.createBuffer();
    index_buffer = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);
    ////spotlight
    u_isHeadLight = gl.getUniformLocation(shader, "isHeadLight");
    lightDirectionLocation = gl.getUniformLocation(shader, "carLightDirection");
    limitLocation = gl.getUniformLocation(shader, "u_limit");


    gl.uniform1f(limitLocation, Math.cos(limit));
    gl.uniform3f(u_ambientColor, ambientColor[0], ambientColor[1], ambientColor[2]);
    gl.uniform3f(u_specularColor, specularColor[0], specularColor[1], specularColor[2]);
    gl.uniform4f(u_diffuseColor, diffuseColor[0], diffuseColor[1], diffuseColor[2], diffuseColor[3]);
    gl.uniform1f(u_specularExponent, specularExponent);
}

function createProgram(gl, vertexShaderID, fragmentShaderID) {
    function getTextContent(elementID) {
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
        var vertexShaderSource = getTextContent(vertexShaderID);
        var fragmentShaderSource = getTextContent(fragmentShaderID);
    } catch (e) {
        throw "Error: Could not get shader source code from script elements.";
    }
    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, vertexShaderSource);
    gl.compileShader(vsh);
    if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
    }
    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
        throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}



/**
 * Subroutine which converts from degrees to radians
 * @param {float} degrees Angle in degrees
 * @return Value of angle in radians
 */
function degToRad(degrees) {
    return degrees * Math.PI / 180;
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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);
    // shaderProgramDebug(modelViewData);
    // console.log(carLightDirection);
}

/**
 * Function to set camera location and viewing direction, as well as facilitate the rending of the
 *   skybox and teapot for each animation frame
 * @return None
 */
function update(object) {
    /* Get the matrix for transforming normal vectors from the modelView matrix,
    	 and send matrices to the shader program*/

    mat3.normalFromMat4(normalMatrix, modelView);
    //Upload Sun
    gl.uniform4f(u_lightPosition, lightposition[0], lightposition[1], lightposition[2], 0);
    gl.uniform1f(u_isMoonDown, moonDown);
    //upload Spot Light
    gl.uniform3f(lightDirectionLocation, carLightDirection[0], carLightDirection[1], carLightDirection[2]);
    gl.uniform4f(carLightPosition_loc, carLightPosition[0], carLightPosition[1], carLightPosition[2], 1.);
    ///Upload Point Light
    gl.uniform4f(pointLightPosition_loc, pointLightPosition[0], pointLightPosition[1], pointLightPosition[2], 1.)

    gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
    gl.uniformMatrix4fv(u_modelView, false, modelView);
    gl.uniformMatrix4fv(u_projection, false, projection);

    /* Draw the modelView.  The data for the modelView was set up in installmodelView() */
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}

/**
 * Function to animate the scene by spinning the teapot around its y axis.
 * @return None
 */
function animate() {
    if (then == 0) {
        then = Date.now();
    } else {
        now = Date.now();
        // Convert to seconds
        now *= 0.001;
        // Subtract the previous time from the current time
        var deltaTime = now - then;
        // Remember the current time for the next frame.
        then = now;
        // Animate the Rotation
        moonDeg += degToRad(1);
        moonDeg %= degToRad(360);
        if (moonDeg > degToRad(135) && moonDeg < degToRad(315)) {
            moonDown = 1.;
        } else {
            moonDown = 0.;
        }
        carPosition[0] = Math.sin(-moonDeg) * 7;
        carPosition[2] = Math.cos(-moonDeg) * 7;
    }
}
/**
 * Function to verify if a value is a power of 2 or not
 * @param {int} value Value to determine whether or not it is a power of 2
 * @return {boolean} Boolean indicating whether a value is a power of 2 (true) or not (false)
 */
function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(projection, Math.PI / 5, 1, 10, viewDistance + 10);
    modelView = rotator.getViewMatrix();
    if (test == 0) {
        if (moonDown == 1.) {
            drawPole(modelView, null, degToRad(180), null, null, [1, 0, 0], null, null, null, 1., pointLightPosition);
            drawMoon(modelView, 0., u_lightPosition, lightposition, [-5, 5, -5], null, null, -moonDeg, null, null, [0, 0, 1], null);
            drawCar(modelView, carPosition, [0.5, 0.5, 0.5], null, -moonDeg, null, null, [0, 1, 0], null, 1, -moonDeg, 1., carLightPosition, carLightDirection);
        } else {
            drawMoon(modelView, 1., u_lightPosition, lightposition, [-5, 5, -5], null, null, -moonDeg, null, null, [0, 0, 1], null);
            drawPole(modelView, null, degToRad(180), null, null, [1, 0, 0], null, null, null, 0., null);
            drawCar(modelView, carPosition, [0.5, 0.5, 0.5], null, -moonDeg, null, null, [0, 1, 0], null, 1, -moonDeg, 0., carLightPosition, carLightDirection);
        }
        drawGround(modelView, [0, -0.4, 0], [2, 2, 2]);
        drawTree(modelView, [-1.5, 0.3, 2], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [-1, 0.3, -1], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [1, 0.3, 0], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [-2.5, 0.3, -5], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [-0.8, 0.3, 5.5], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [1, 0.3, -5.5], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [2, 0.3, -5], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [5.5, 0.3, -1], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [5.6, 0.3, 0], degToRad(180), null, null, [1, 0, 0], null, null, null);
        drawTree(modelView, [5.4, 0.3, 1], degToRad(180), null, null, [1, 0, 0], null, null, null);

    } else {
        // var pos = vec4.create();
        // vec4.transformMat4( pos, [0,0,0,1], mat );
        // var forward = vec4.create( );
        // var normalized = vec3.create();
        // vec4.transformMat4( forward,[0,0,2,1], mat );
        // lightDirection = vec3.fromValues((forward[0]-lightPosition[0]),  (forward[1]-lightPosition[1]), (forward[2]-lightPosition[2]));
        // console.log(lightDirection);
    }
}
/**
 * Function for doing the initialization work of the program and kicking off
 *   the animation callback
 * @return None
 */
function startup() {
    try {
        canvas = document.getElementById("myGLCanvas");
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
            throw "Browser does not support WebGL";
        }
    } catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not get a WebGL graphics context.</p>";
        return;
    }

    gl.clearColor(0.5, 0.5, 0.5, 0.9); //back ground color
    gl.enable(gl.DEPTH_TEST);

    try {
        initGL(); // initialize the WebGL graphics context
    } catch (e) {
        document.getElementById("canvas-holder").innerHTML =
            "<p>Sorry, could not initialize the WebGL graphics context:" + e + "</p>";
        return;
    }
    rotator = new TrackballRotator(canvas, draw, viewDistance, viewDir, up);
    draw();
    document.getElementById("animate").checked = false;
    document.getElementById("animate").onchange = function() {
        readyDraw= (this.checked);
        tick();
    };
}

/**
 * Callback function to perform draw each frame
 * @return None
 */
function tick() {
    if( readyDraw ){
        requestAnimFrame(tick);
        draw();
        animate();
    }
}
