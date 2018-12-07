function addLight( lightBuffer, pos ){
	gl.uniform4f(lightBuffer, pos[0], pos[1], pos[2], pos[3]);
}
