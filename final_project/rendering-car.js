function wheel(mat, turnWheel) {
    //size = [2,2,2];
    //mat4.scale( mat, mat, size );
    mat4.rotate(mat, mat, turnWheel, [0, 0, 1]);
    drawCylinder(mat, grey, 1, 1, 32, 0, 0, null, null, null, null, null, null, null, [0.08, 0.08, 0.8],null, null, null);
    drawCylinder(mat, grey, 1, 1, 32, 1, 1, [0, -2.5, 0], degToRad(-90), null, null, [1, 0, 0], null, null, [0.08, 0.08, 1.5],null, null, null);
    drawCylinder(mat, grey, 1, 1, 32, 1, 1, [1.5, -1.5, 0], degToRad(-90), null, null, [1, 1, 0], null, null, [0.08, 0.08, 1.5],null, null, null);
    drawCylinder(mat, grey, 1, 1, 32, 1, 1, [2, 0, 0], null, degToRad(-90), null, null, [0, 1, 0], null, [0.08, 0.08, 1.5],null, null, null);
    drawCylinder(mat, grey, 1, 1, 32, 1, 1, [0, -2, 0], degToRad(-90), degToRad(45), null, [1, 0, 0], [0, 1, 0], null, [0.08, 0.08, 1.5],null, null, null);
    mat4.rotate(mat, mat, -turnWheel, [0, 0, 1]);
    drawTorus(mat, black, 2, 1, 32, 16, null, null, null, null, null, null, null, [0.5, 0.5, 0.5]);
    //mat4.scale(mat, mat, [1/size[0], 1/size[1], 1/size[2]]);
}

function drawLight(mat,light, leftLightPosition, rightLightPosition,lightDirection) {
    drawCylinder(mat, yellow, 1, 1, 32, 0, 1, [-5, 0, 15], null, degToRad(-90), null, null, [0, 1, 0], null, [0.1, 0.1, 0.1], light, leftLightPosition, lightDirection);
    drawCylinder(mat, yellow, 1, 1, 32, 0, 1, [5, 0, 15], null, degToRad(-90), null, null, [0, 1, 0], null, [0.1, 0.1, 0.1], light, rightLightPosition, lightDirection);
}

function drawCarBody(mat, location, size, headLight,leftLightPosition, rightLightPosition, lightDirection) {
        drawCube(mat, red, 1, null, degToRad(-90), degToRad(180), null, [1,0,0], [0,1,0], null, [3,1.5, 0.5]);
        drawCube(mat, red, 1, [0, 0, -1], degToRad(-90), degToRad(180), null, [1,0,0], [0,1,0], null, [1.5,1.2, .5]);
        drawLight(mat, headLight, leftLightPosition, rightLightPosition, lightDirection);
}

function drawWheel(mat, trans, scale, degx, degy, degz, x, y, z, turnWheel) {
    if (degx != null || degy != null || degz != null) {
        if (x != null) {
            mat4.rotate(mat, mat, degx, x);
        }
        if (y != null) {
            mat4.rotate(mat, mat, degy, y);
        }
        if (z != null) {
            mat4.rotate(mat, mat, degz, z);
        }
    }
    if (scale != null) {
        mat4.scale(mat, mat, scale);
    }
    if (trans != null) {
        mat4.translate(mat, mat, trans);
    }
    wheel(mat, turnWheel);
    if (trans != null) {
        mat4.translate(mat, mat, [-trans[0], -trans[1], -trans[2]]);
    }
    if (scale != null) {
        mat4.scale(mat, mat, [1 / scale[0], 1 / scale[1], 1 / scale[2]]);
    }
    if (degx != null || degy != null || degz != null) {
        if (z != null) {
            mat4.rotate(mat, mat, -degz, z);
        }
        if (y != null) {
            mat4.rotate(mat, mat, -degy, y);
        }
        if (x != null) {
            mat4.rotate(mat, mat, -degx, x);
        }
    }
}


/*
 ** turnWheel 1 is turning, 0 is not turning wheel
 */
function drawCar(mat, location, size, degx, degy, degz, x, y, z, turnWheel, turningSpeed, headLight, leftLightPosition, rightLightPosition, lightDirection) {
    var rotationMatrix = mat4.create();
    if (size != null) {
        mat4.scale(mat, mat, size);
    }
    if (location != null) {
        mat4.translate(mat, mat, location);
    }
    if (degx != null || degy != null || degz != null) {
        if (x != null) {
            mat4.rotate(mat, mat, degx, x);
        }
        if (y != null) {
            mat4.rotate( rotationMatrix, rotationMatrix, degy, y );
            mat4.rotate(mat, mat, degy, y);
        }
        if (z != null) {
            mat4.rotate(mat, mat, degz, z);
        }
    }
    drawCarBody(mat, null, null, headLight, leftLightPosition, rightLightPosition,lightDirection);
    if (turnWheel == 1) {
        //rear left
        drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], null, null, null, null, null, null, -turningSpeed);
        //reat right
        drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], degToRad(-180), null, null, [1, 0, 0], null, null, turningSpeed);
        //front right
        drawWheel(mat, [-2, 0, 2], [0.5, 0.5, 0.5], degToRad(-180), null, null, [1, 0, 0], null, null, turningSpeed);
        //front left
        drawWheel(mat, [-2, 0, 2], [0.5, 0.5, 0.5], null, null, null, null, null, null, -turningSpeed);
    }
    if (turnWheel == 0) {
        //rear left
        drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], null, null, null, null, null, null, null);
        //reat right
        drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], degToRad(180), null, null, [1, 0, 0], null, null, null);
        //front right
        drawWheel(mat, [-2, 0, -2], [0.5, 0.5, 0.5], null, null, null, null, null, null, null);
        //front left
        drawWheel(mat, [-2, 0, -2], [0.5, 0.5, 0.5], degToRad(180), null, null, [1, 0, 0], null, null, null);
    }
    if (degx != null || degy != null || degz != null) {
        if (z != null) {
            mat4.rotate(mat, mat, -degz, z);
        }
        if (y != null) {
            mat4.rotate(mat, mat, -degy, y);
        }
        if (x != null) {
            mat4.rotate(mat, mat, -degx, x);
        }
    }
    if (location != null) {
        mat4.translate(mat, mat, [-location[0], -location[1], -location[2]]);
    }
    if (size != null) {
        mat4.scale(mat, mat, [1 / size[0], 1 / size[1], 1 / size[2]]);
    }
}
