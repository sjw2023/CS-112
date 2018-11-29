function wheel(mat) {
    drawCylinder(mat, grey,1, 1, 32, 0, 0, null, null, null, null, null, null, null, [0.08, 0.08, 0.5]);
    drawCylinder(mat, grey,1, 1, 32, 1, 1, [0, -2.5, 0], degToRad(-90), null, null, [1, 0, 0], null, null, [0.08, 0.08, 1.5]);
    drawCylinder(mat, grey,1, 1, 32, 1, 1, [1.5, -1.5, 0], degToRad(-90), null, null, [1, 1, 0], null, null, [0.08, 0.08, 1.5]);
    drawCylinder(mat, grey,1, 1, 32, 1, 1, [2, 0, 0], null, degToRad(-90), null, null, [0, 1, 0], null, [0.08, 0.08, 1.5]);
    drawCylinder(mat, grey,1, 1, 32, 1, 1, [0, -2, 0], degToRad(-90), degToRad(45), null, [1, 0, 0], [0, 1, 0], null, [0.08, 0.08, 1.5]);
    drawTorus(mat, black, 2, 1, 32, 16, null, degToRad(0), null, null, [1, 0, 0], null, null, [0.5, 0.5, 1]);
}

function drawCarBody(mat, location, size) {

    drawCube(mat, red, 1, null, null, null, null, null, null, null, [3, 0.5, 1.5]);
    drawCube(mat, red, [0, 1, 0], null, null, null, null, null, null, [1.2, 0.5, 1.5]);
}

function drawWheel(mat, trans, scale, degx, degy, degz, x, y, z) {
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
    wheel(mat);
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

function drawCar(mat, location, size) {
    if (size != null) {
        mat4.scale(mat, mat, size);
    }
    if (location != null) {
        mat4.translate(mat, mat, location);
    }
    drawCarBody(mat, [0, 0, 0], [0, 0, 0]);
    //rear left
    drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], null, null, null, null, null, null);
    //reat right
    drawWheel(mat, [2, 0, 2], [0.5, 0.5, 0.5], degToRad(180), null, null, [1, 0, 0], null, null);
    //front right
    drawWheel(mat, [-2, 0, -2], [0.5, 0.5, 0.5], null, null, null, null, null, null);
    //front left
    drawWheel(mat, [-2, 0, -2], [0.5, 0.5, 0.5], degToRad(180), null, null, [1, 0, 0], null, null);
    if (location != null) {
        mat4.translate(mat, mat, [-location[0], -location[1], -location[2]]);
    }
    if (size != null) {
        mat4.scale(mat, mat, [1 / size[0], 1 / size[1], 1 / size[2]]);
    }
}
