function drawCube(mat, color, side, trans, degx, degy, degz, x, y, z, scale) {
    var object = cube(side);
    mvPush();
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
    mvPop();
}

function drawTorus(mat, color, inner, outer, slices, stacks, trans, degx, degy, degz, x, y, z, scale) {
    var object = uvTorus(inner, outer, slices, stacks);
    installModel(object);
        mvPush( );
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
    mvPop();
    // if (trans != null) {
    //     mat4.translate(mat, mat, [-trans[0], -trans[1], -trans[2]]);
    // }
    // if (scale != null) {
    //     mat4.scale(mat, mat, [1 / scale[0], 1 / scale[1], 1 / scale[2]]);
    // }
    // if (degx != null || degy != null || degz != null) {
    //     if (z != null) {
    //         mat4.rotate(mat, mat, -degz, z);
    //     }
    //     if (y != null) {
    //         mat4.rotate(mat, mat, -degy, y);
    //     }
    //     if (x != null) {
    //         mat4.rotate(mat, mat, -degx, x);
    //     }
    // }
}

function drawRing(mat, color, inner, outer, slices, trans, degx, degy, degz, x, y, z, scale) {
    var object = ring(inner, outer, slices);
    installModel(object);
        mvPush();
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
    mvPop();
    // if (trans != null) {
    //     mat4.translate(mat, mat, [-trans[0], -trans[1], -trans[2]]);
    // }
    // if (scale != null) {
    //     mat4.scale(mat, mat, [1 / scale[0], 1 / scale[1], 1 / scale[2]]);
    // }
    // if (degx != null || degy != null || degz != null) {
    //
    //     if (z != null) {
    //         mat4.rotate(mat, mat, -degz, z);
    //     }
    //
    //     if (y != null) {
    //         mat4.rotate(mat, mat, -degy, y);
    //     }
    //     if (x != null) {
    //         mat4.rotate(mat, mat, -degx, x);
    //     }
    // }
}


function drawCylinder(mat, color, radius, height, slice, noTop, noBottom, trans, degx, degy, degz, x, y, z, scale, light,lightPosition, lightDirection) {
    var object = uvCylinder(radius, height, slice, noTop, noBottom);
    installModel(object);
    mvPush();
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
    if(light == 1){
        // gl.uniform1f(u_isHeadLight, 1.);
        // vec4.transformMat4( lightPosition, [0,0,0,1], mat );
        // var forward = vec4.create( );
        // var normalized = vec3.create();
        // vec4.transformMat4( forward,[0,0,2,1], mat );
        // // lightDirection = vec3.fromValues((forward[0]-lightPosition[0])*100,  (forward[1]-lightPosition[1])*100, (forward[2]-lightPosition[2])*100);
        // lightDirection = vec3.fromValues((forward[0]-lightPosition[0]),  (forward[1]-lightPosition[1]), (forward[2]-lightPosition[2]));
    }
    bindColor(color, object.vertexPositions.length);
    update(object);
    mvPop();
    if(light == 1)
    {
        gl.uniform1f(u_isHeadLight, 0.);
    }
}

function drawCone(mat, color, radius, height, slice, noBottom, trans, degx, degy, degz, x, y, z, scale) {
    var object = uvCone(radius, height, slice, noBottom);
    installModel(object);
        mvPush( );
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
    mvPop();
    // if (trans != null) {
    //     mat4.translate(mat, mat, [-trans[0], -trans[1], -trans[2]]);
    // }
    // if (scale != null) {
    //     mat4.scale(mat, mat, [1 / scale[0], 1 / scale[1], 1 / scale[2]]);
    // }
    // if (degx != null || degy != null || degz != null) {
    //
    //     if (z != null) {
    //         mat4.rotate(mat, mat, -degz, z);
    //     }
    //     if (y != null) {
    //         mat4.rotate(mat, mat, -degy, y);
    //     }
    //     if (x != null) {
    //         mat4.rotate(mat, mat, -degx, x);
    //     }
    // }
}

function drawSphere(mat, color, radius, slices, stacks, trans, degx, degy, degz, x, y, z, scale, light, lightPosition) {
    var object = uvSphere(radius, slices, stacks);
    installModel(object);
    mvPush( );
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
    if(light == 1){
        gl.uniform1f(u_isMoon, 1.);
        // var light = vec4.create();
        vec4.transformMat4( lightPosition, [0,0,0,1], mat );
        // console.log(lightPosition);
        // lightPosition[0] = light[0];
        // lightPosition[1] = light[1];
        // lightPosition[2] = light[2];
    }

    bindColor(color, object.vertexPositions.length);
    update(object);
    // if (trans != null) {
    //     mat4.translate(mat, mat, [-trans[0], -trans[1], -trans[2]]);
    // }
    // if (scale != null) {
    //     mat4.scale(mat, mat, [1 / scale[0], 1 / scale[1], 1 / scale[2]]);
    // }
    mvPop();
    // if (degx != null || degy != null || degz != null) {
    //
    //     if (z != null) {
    //         mat4.rotate(mat, mat, -degz, z);
    //     }
    //     if (y != null) {
    //         mat4.rotate(mat, mat, -degy, y);
    //     }
    //     if (x != null) {
    //         mat4.rotate(mat, mat, -degx, x);
    //     }
    // }
    if(light == 1){
        gl.uniform1f(u_isMoon, 0.0);
    }
}

function addLight( lightBuffer, pos ){
	gl.uniform4f(lightBuffer, pos[0], pos[1], pos[2], pos[3]);
}

function addLightDir( direction, dir)
{
    gl.uniform3f(direction, dir[0], dir[1], dir[2]);
}
