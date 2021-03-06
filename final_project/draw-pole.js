function drawPole( mat, trans, degx, degy, degz, x, y, z, scale , lightOn, pointLightPosition ){
	if ( degx != null || degy != null || degz != null ){
		if( x != null )
		{
			mat4.rotate( mat, mat, degx, x );
		}
		if( y != null )
		{
			mat4.rotate( mat, mat, degy, y );
		}
		if( z != null )
		{
			mat4.rotate( mat, mat, degz, z );
		}
	}
	if ( scale != null ){
		mat4.scale( mat, mat, scale );
	}
	if ( trans != null ){
		mat4.translate( mat, mat, trans );
	}
  drawCylinder( mat, grey, 1,1,32, 0, 0, null, degToRad(90), null, null, [1,0,0], null, null, [ 0.08, 0.08, 1.2],null, null, null );
  drawSphere(mat, yellow, 0.3,32,16,[0,0,1],  degToRad(90), null, null, [1,0,0], null, null, [ 0.5,0.5,0.5], null, null, lightOn, pointLightPosition);
	if ( trans != null ){
		mat4.translate( mat, mat, [ -trans[0], -trans[1], -trans[2]] );
	}
	if ( scale != null ){
		mat4.scale( mat, mat, [ 1/scale[0], 1/scale[1], 1/scale[2]] );
	}
	if ( degx != null || degy != null || degz != null ){
		if( z != null )
		{
			mat4.rotate( mat, mat, -degz, z );
		}
		if( y != null )
		{
			mat4.rotate( mat, mat, -degy, y );
		}
		if( x != null )
		{
			mat4.rotate( mat, mat, -degx, x );
		}
	}
}
