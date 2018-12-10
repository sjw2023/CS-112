function drawCube(mat, color, side, trans, degx, degy, degz, x, y, z, scale) {
    var object = cube(side);

    installModel(object);
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
    bindColor(color, object.vertexPositions.length);
    update(object);
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

function drawTorus(mat, color, inner, outer, slices, stacks, trans, degx, degy, degz, x, y, z, scale) {
    var object = uvTorus(inner, outer, slices, stacks);
    installModel(object);
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
    bindColor(color, object.vertexPositions.length);
    update(object);
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

function drawRing(mat, color, inner, outer, slices, trans, degx, degy, degz, x, y, z, scale) {
    var object = ring(inner, outer, slices);
    installModel(object);
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
    bindColor(color, object.vertexPositions.length);
    update(object);
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


function drawCylinder(mat, color, radius, height, slice, noTop, noBottom, trans, degx, degy, degz, x, y, z, scale, light, lightPosition, lightDirection) {
    var object = uvCylinder(radius, height, slice, noTop, noBottom);
    installModel(object);
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
    if (light == 1) {
        gl.uniform1f(u_isHeadLight, 1.);
        vec4.transformMat4(lightPosition, [0, 1, 0, 1], mat);
        lightDirection = [0,0,1];
        mat3.normalFromMat4( normalMatrix, mat );
        // vec4.transformMat4( lightDirection, lightDirection, rotationMatrix );
        vec3.transformMat3(lightDirection, lightDirection, normalMatrix);
        var forward = vec3.create();
    }
    bindColor(color, object.vertexPositions.length);
    update(object);
    // gl.uniform1f(u_isHeadLight, 0.);
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
    if (light == 1) {
        gl.uniform1f(u_isHeadLight, 0.);
    }
}

function drawCone(mat, color, radius, height, slice, noBottom, trans, degx, degy, degz, x, y, z, scale) {
    var object = uvCone(radius, height, slice, noBottom);
    installModel(object);
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
    bindColor(color, object.vertexPositions.length);
    update(object);
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

function drawSphere(mat, color, radius, slices, stacks, trans, degx, degy, degz, x, y, z, scale, light, lightPosition, pointLightOn, pointLightPosition) {
    var object = uvSphere(radius, slices, stacks);
    installModel(object);
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
    if( light != null )
    {
        gl.uniform1f(u_isMoon, 1.);
        if (light == 1.) {

            // gl.uniform1f(isPointLight_loc, 0.);
            /*
            // Uploading light with 0 to make it a directional light.
            // But here it need to be 1 to transform
            // L = normalize(  lightPos.xyz );
            // Means a same direction for all the object.
            // L has the direction vector from the origin(0,0,0);
            */
            vec4.transformMat4(lightPosition, [0, 0, 0, 1], mat);
        }
    }

    if(pointLightOn != null)
    {
        gl.uniform1f(isPointLight_loc, 1.);
        if( pointLightOn ==  1.)
        {
            vec4.transformMat4(pointLightPosition, [0, 0, 0, 1], mat);
        }
    }
    bindColor(color, object.vertexPositions.length);
    update(object);
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
    if (light == 1. || light ==0.) {
        gl.uniform1f(u_isMoon, 0.);
    }
    if( pointLightOn ==  1. || pointLightOn ==  0.)
    {
        gl.uniform1f(isPointLight_loc, 0.);
    }
}

function addLight(lightBuffer, pos) {
    gl.uniform4f(lightBuffer, pos[0], pos[1], pos[2], pos[3]);
}

function addLightDir(direction, dir) {
    gl.uniform3f(direction, dir[0], dir[1], dir[2]);
}
