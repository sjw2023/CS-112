/**
 * @fileoverview This file is the main javascript file for this program. It wraps together
 * the skybox and teapot drawing algorithms, the camera manipulation algorithms, and the lighting
 * model. This file is where all the drawing functions are called from. This file is dependent upon
 * user_commands.js, readText.js, skybox.js, render_teapot.js, teapot_0, gl-matrix-min.js, and webgl-utils.js.
 */
var gl;
var canvas;

var a_coords_loc;
var a_normal_loc;
var a_color_loc;
var a_color_buffer;
var a_coords_buffer; // Buffer for a_coords.
var a_normal_buffer; // Buffer for a_normal.
var index_buffer; // Buffer for indices.

var shader; // shader program


//////location variables
var u_lightPosition;
var u_modelview;
var u_projection;
var u_normalMatrix;


///////lightColor////////
var u_ambientColor;
var u_diffuseColor;
var u_specularColor;
var u_specularExponent;
var ambientColor = [0, 0, 0];
var diffuseColor = [0.5,0.5,.5];
var specularColor = [0.5, 0.5, 0.5];
var specularExponent = 5;

var u_isMoon;
var u_isMoonDown=0.;
var u_isHeadLight



/////////

var rotator; // A TrackballRotator to implement rotation by mouse.

// Create ModelView matrix
var mvMatrix = mat4.create();

// Create Projection matrix
var projection = mat4.create();

// Create Normal matrix
var normalMatrix = mat3.create();
// var viewMatrix = mat4.create();
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

var limit = degToRad(340);
var lightDirectionLocation;
var limitLocation;
var carLightPosition_loc;

// var lx = lightposition[0];
// var ly = lightposition[1];
// var lz = lightposition[2];
var x = carPosition[0];
var y = carPosition[1];
var z = carPosition[2];

var carLightPosition = vec4.create();
var carLightPositionForward = [0, 0, 0];
var carRightLightPosition = [2, 2, 2];
var u_isHeadLight = 0;
var carLightDirection = vec3.create();
var moonDown = 0;
lightDeg = degToRad(20);
forwardDeg = degToRad(70);

var mvMatrixStack = [];
// var StackSize = 0;


// var cxf = carLightPositionForward[0];
// var czf = carLightPositionForward[2];
// var cx = carLightPosition[0];
// var cz = carLightPosition[2];

function mvPush()
{
    var copy = mat4.clone(mvMatrix);
    mvMatrixStack.push(copy);
}
function mvPop()
{
    if (mvMatrixStack.length == 0) {
    	throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function initGL() {
    shader = createProgram(gl, "vshader-source", "fshader-source");
    gl.useProgram(shader);


    a_coords_loc = gl.getAttribLocation(shader, "a_coords");
    a_normal_loc = gl.getAttribLocation(shader, "a_normal");
    u_modelview = gl.getUniformLocation(shader, "modelview");
    u_projection = gl.getUniformLocation(shader, "projection");
    u_normalMatrix = gl.getUniformLocation(shader, "normalMatrix");

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

    a_coords_buffer = gl.createBuffer();
    a_normal_buffer = gl.createBuffer();
    index_buffer = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);
    ////spotlight
    //u_isHeadLight = gl.getUniformLocation(shader, "isHeadLight");
    carLightPosition_loc = gl.getUniformLocation(shader, "carHeadLightPosition");
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
    // var temp = vec4.create();
    // for(var i  = 0; i < modelData.vertexPositions.length; i++){
    //     // console.log( modelData.vertexPositions[i]  );
    //     temp = vec4.transformMat4( temp,[ modelData.vertexPositions[i],modelData.vertexPositions[i+1],modelData.vertexPositions[i+2],1.] , modelview );
        // var i = 20;
        // console.log(carLightPosition);
        // console.log( [ modelData.vertexPositions[i],modelData.vertexPositions[i+1],modelData.vertexPositions[i+2],1.] );
    // }
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
    // shaderProgramDebug(modelData);
    // console.log(carLightDirection);
}

function uploadCarLight() {
    // calcLightDir();
    // applyMatrix4(modelview, carLightPosition);
    // transformDirection( mat, carLightDirection );
    // console.log(carLightDirection);
    // console.log(carLightPosition); console.log(carLightPositionForward);
    // gl.uniform3f(lightDirectionLocation, carLightDirection[0], carLightDirection[1], carLightDirection[2]);
    // gl.uniform3f(carLightPosition_loc, carLightPosition[0], carLightPosition[1], carLightPosition[2]);

}
//
// function shaderProgramDebug(modelData) {
//     lPosition = vec3.fromValues(carLightPosition[0], carLightPosition[1], carLightPosition[2]);
//
//     a_coords = vec3.fromValues(modelData.vertexPositions[0], modelData.vertexPositions[1], modelData.vertexPositions[2]);
//     a_normal = vec3.fromValues(modelData.vertexNormals[0], modelData.vertexNormals[1], modelData.vertexNormals[2])
//
//     eyePt = vec3.fromValues(0.0, 0.0, 10.0);
//
//     coords = vec4.fromValues(a_coords[0], a_coords[1], a_coords[2], 1.0);
//     applyMatrix4(modelview, coords); //transformed position of vertex
//     // gl_Position = projection * eyeCoords;
//     // console.log(" model : "+coords);
//     lightPos = vec3.fromValues(carLightPosition[0], carLightPosition[1], carLightPosition[2]);
//     lightDir = vec3.fromValues(carLightDirection[0], carLightDirection[1], carLightDirection[2]); //normalize(carLightDirection);
//     vec4.normalize(lightDir, lightDir);
//     // console.log("light eyecoord : "+lightDir);
//
//     applyMatrix4(normalMatrix, a_normal);
//     // if (lightPos.w == 0.0) {
//     //     L = normalize(lightPos.xyz);
//     // } else {
//     var result = [lightPos[0] - coords[0], lightPos[1] - coords[1], lightPos[2] - coords[2]];
//
//     // console.log(lightPos[0]-coords[0],lightPos[1]-coords[1],lightPos[2]-coords[2]);
//
//     // vec4.sub(lightPos, coords);
//
//     // }
//     // //  float diffuseLightWeightning = max(dot(N, L), 0.0);
//     // R = normalize(reflect(-L, N));
//     // V = normalize(-eyeCoords.xyz); // (Assumes a perspective projection.)
//     // if (dot(L, N) <= 0.0) {
//     //     v_color = vec4(0, 0, 0, 1);
//     // } else {
//     //     vec3 dcolor;
//     vec3.normalize(result, result);
//
//     // console.log(" light pos : "+lightPos);console.log(" dir : "+result);
//     // console.log(" light dir : "+ Math.sqrt(vec3.squaredLength(lightDir)));
//     var angle = Math.acos(vec3.dot(result, lightDir));
//     // console.log(result);console.log(lightDir);
//     // console.log(20);
//     // console.log( "limit : " +Math.cos(limit));
//
//     // if (angle > Math.cos(limit)) {
//     //         dcolor = color;
//     //         dcolor = 0.8 * dot(L, N) * diffuseColor.rgb; // 0.8 is diffuse intensity of light
//     //         if (dot(R, V) > 0.0) {
//     //             dcolor += 0.4 * pow(dot(R, V), specularExponent) * specularColor; // 0.4 is specular intensity of light
//     //         }
//     //         dcolor *= vec3(color);
//     //         v_color = vec4(dcolor, diffuseColor.a);
//
//     // }
//     //     if (isMoon == 1.) {
//     //         v_color = vec4(color, 1.);
//     //     } else {
//     //         v_color = vec4(dcolor, diffuseColor.a);
//     //     }
//     // }
// }

/**
 * Function to set camera location and viewing direction, as well as facilitate the rending of the
 *   skybox and teapot for each animation frame
 * @return None
 */
function update(object) {

    /* Get the matrix for transforming normal vectors from the modelview matrix,
    	 and send matrices to the shader program*/
    mat3.normalFromMat4(normalMatrix, mvMatrix);
    // mat3.invert(normalMatrix,normalMatrix);
    // mat3.transpose(normalMatrix,normalMatrix);
    gl.uniform4f(u_lightPosition, lightposition[0], lightposition[1], lightposition[2], lightposition[3]);
    gl.uniform3f(lightDirectionLocation, carLightDirection[0], carLightDirection[1], carLightDirection[2]);
    gl.uniform4f(carLightPosition_loc, carLightPosition[0], carLightPosition[1], carLightPosition[2], 1.);
    // for(var i  = 0; i < object.vertexPositions.length-2; i++)
    // {
    //     var lDir = [ carLightPosition[i]-object.vertexPositions[i], carLightPosition[i+1]-object.vertexPositions[i+1], carLightPosition[i+2]-object.vertexPositions[i+2] ]
    //     vec3.normalize( lDir, lDir );
    //     console.log( vec3.dot( carLightDirection,lDir ));
    //
    //     if( vec3.dot( carLightDirection, vec3.normalize( lDir, lDir ) ) > Math.cos(20))
    //         console.log(vec3.dot( carLightDirection, vec3.normalize( lDir, lDir ) ));
    // }
    // console.log(lightposition);
    ////////Upload Matrices.
    gl.uniformMatrix4fv(u_modelview, false, mvMatrix);
    gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
    gl.uniformMatrix4fv(u_projection, false, projection);

    /* Draw the model.  The data for the model was set up in installModel() */
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}


function calcLightDir() {
    // var lightDirectionMat = mat4.create();
    // // mat4.lookAt(lightDirectionMat, carLightPosition, carLightPositionForward, [0,1,0]);
    // carLightDirection[0] = carLightPositionForward[0] - carLightPosition[0];
    // carLightDirection[1] = carLightPositionForward[1] - carLightPosition[1];
    // carLightDirection[2] = carLightPositionForward[2] - carLightPosition[2];
    // carLightDirection[0] = -lightDirectionMat[8];
    // carLightDirection[1]= -lightDirectionMat[9];
    // carLightDirection[2]= -lightDirectionMat[10];
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
        // lightDeg += degToRad(1);
        // lightDeg %= degToRad(360);
        // forwardDeg += degToRad(1);
        // forwardDeg %= degToRad(360);
        if (moonDeg > degToRad(135) && moonDeg < degToRad(315)) {
            gl.uniform1f(u_isMoonDown, 1.);
            moonDown = 1;
        } else {
            moonDown = 0;
            gl.uniform1f(u_isMoonDown, 0.);
        }
        //rotate z axis
        // newX = x * c + y * s;
        // newY = x * -s + y * c;
        // lightposition[0] = (lx * Math.cos(-moonDeg)) + (ly * -Math.sin(-moonDeg));
        // lightposition[1] = (lx * Math.sin(-moonDeg)) + (ly * Math.cos(-moonDeg));
        // lightposition[0] = Math.sin(-moonDeg) * 3.7;
        // lightposition[1] = Math.cos(-moonDeg) * 3.7;////rotate light zaxis

        // carLightPosition[0] = (cx * Math.cos(-moonDeg)) + (cz * Math.sin(-moonDeg));
        // carLightPosition[2] = (cx * -Math.sin(-moonDeg)) + (cz * Math.cos(-moonDeg));
        // carLightPosition[0] = Math.sin(-lightDeg) * 3.5;
        // carLightPosition[2] = Math.cos(-lightDeg) * 3.5;/////rotate light yaxis

        // carLightPositionForward[0] = (cxf * Math.cos(-moonDeg)) + (czf * Math.sin(-moonDeg));
        // carLightPositionForward[2] = (cxf * -Math.sin(-moonDeg)) + (czf * Math.cos(-moonDeg));
        // carLightPositionForward[0] = Math.sin(-forwardDeg) * 10;
        // carLightPositionForward[2] = Math.cos(-forwardDeg) * 10;

        // carPosition[0] = (x * Math.cos(-moonDeg)) + (z * Math.sin(-moonDeg));
        // carPosition[2] = (x * -Math.sin(-moonDeg)) + (z * Math.cos(-moonDeg));
        carPosition[0] =  Math.sin (-moonDeg)*7;
        carPosition[2] =  Math.cos(-moonDeg)*7;
        // carLightDirection[0] = (cx * Math.cos(-moonDeg)) + (cz * Math.sin(-moonDeg));
        // carLightDirection[2] = (cx * -Math.sin(-moonDeg)) + (cz * Math.cos(-moonDeg));

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
    mvMatrix = rotator.getViewMatrix();

    testing(mvMatrix);
    // drawMoon(modelview, 1, u_lightPosition, lightposition, [-5, 5, -5], null, null, -moonDeg, null, null, [0, 0, 1], null);
    // if (moonDown == 1) {
        // drawCar(mat,        location,       size,         degx, degy, degz, x, y, z, turnWheel, turningSpeed, headLight, lightPosition, lightDirection) {
        // drawCar(mvMatrix, carPosition, [0.5, 0.5, 0.5], null, -moonDeg, null, null, [0,1,0],null, 1, -moonDeg, 1, carLightPosition, carLightDirection);
    // } else {
        // drawCar(modelview, carPosition, [0.5, 0.5, 0.5], null, -moonDeg, null, null, [0,1,0],null, 1, -moonDeg, 1, carLightPosition, carLightDirection);
    // }
    // drawGround(modelview, [0, -0.4, 0], [2, 2, 2]);
    // drawTree(modelview, [-1.5, 0.3, 2], degToRad(180), null, null, [1,0,0], null, null, null);
    // drawTree(modelview, [-1, 0.3, -1], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [1, 0.3, 0], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [-2.5, 0.3, -5], degToRad(180), null,  null,  [1,0,0], null, null, null);
    // drawTree(modelview, [-0.8, 0.3, 5.5], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [1, 0.3, -5.5], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [2, 0.3, -5], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [5.5, 0.3, -1], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [5.6, 0.3, 0], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawTree(modelview, [5.4, 0.3, 1], degToRad(180), null, null,  [1,0,0], null, null, null);
    // drawSphere(modelview, yellow, 1, 32, 16, carLightPosition, null, null, null, null, null, null, null);
    // drawCylinder(modelview,yellow, 1, 1 ,32, 0,0,[0,0,0], null, null, null, null, null, null ,null);
    // drawCylinder(modelview,yellow, 1, 1 ,32, 0,0,[0,0,-1], null, null, null, null, null, null ,null);

    // drawCube(modelview, red, 1, carLightPositionForward, null, null, null, null, null, null, null);
    // drawPole(modelview, null, degToRad(180), null, null, [1,0,0], null, null, null);
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
    tick();
}

/**
 * Callback function to perform draw each frame
 * @return None
 */
function tick() {
    requestAnimFrame(tick);
    draw();
    animate();
}


function applyMatrix4(m, vector) {

    var x = vector[0],
        y = vector[1],
        z = vector[2];
    var e = m;

    var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

    vector[0] = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    vector[1] = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    vector[2] = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;


}

function transformDirection(m, vector) {
    var x = vector[0],
        y = vector[1],
        z = vector[2];
    var e = m;

    vector[0] = e[0] * x + e[4] * y + e[8] * z;
    vector[1] = e[1] * x + e[5] * y + e[9] * z;
    vector[2] = e[2] * x + e[6] * y + e[10] * z;
}



function testing(mat)
{
    drawCylinder(mat, yellow, 1, 1, 32, 0, 1, [0, 0, 0], null, degToRad(-90), null, null, [0, 1, 0], null, [0.1, 0.1, 0.1], 1,carLightPosition, carLightDirection);
    // drawCylinder(mat, yellow, 1, 1, 32, 0, 1, [0, 0, 3], null, degToRad(-90), null, null, [0, 1, 0], null, [0.1, 0.1, 0.1], 1,carLightPosition, carLightDirection);
    // drawCylinder(mat, red, 1, 1, 32, 0, 0, null, null, degToRad(-90), null, null, [0, 1, 0], null, null, 1, carLightPosition, carLightDirection);
    // drawCarBody(mat, headLight, lightPosition, lightDirection);
    drawCarBody(mat, 1, carLightPosition, carLightDirection);
}
