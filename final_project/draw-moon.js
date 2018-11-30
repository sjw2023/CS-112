function drawMoon(mat, onOff, lightBuffer, lightPosition, trans, degx, degy, degz, x, y, z, scale) {

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
	if(onOff==1)
	{
		gl.uniform1f(u_isMoon, 1.);
		addLight( lightBuffer, [ lightposition[0],lightposition[1], lightposition[2], lightposition[3]] );
	}
    drawSphere(mat, yellow, 1, 32, 16, null, null, null, null, null, null, null, null);
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
    if(onOff == 1){
        gl.uniform1f(u_isMoon, 0.0);
    }
}

function addLight( lightBuffer, lightPosition ){
	gl.uniform4f(lightBuffer, lightPosition[0], lightPosition[1], lightPosition[2], lightPosition[3]);
}
