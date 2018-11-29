function drawCube( mat, color, side, trans, degx, degy, degz, x, y, z, scale  ){
	var object = cube( side );
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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

function drawTorus( mat, color, inner, outer, slices, stacks, trans, degx, degy, degz, x, y, z, scale ){
	var object = uvTorus( inner, outer, slices, stacks );
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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






function drawRing( mat, color,inner, outer, slices, trans, degx, degy, degz, x, y, z, scale ){
	var object = ring( inner, outer, slices );
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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
		}if( x != null )
		{
			mat4.rotate( mat, mat, -degx, x );
		}
	}
}


function drawCylinder( mat, color,radius, height, slice, noTop, noBottom, trans, degx, degy, degz, x, y, z, scale ){
	var object = uvCylinder(radius,height,slice,noTop, noBottom);
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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

function drawCone( mat, color,radius, height, slice, noBottom, trans, degx, degy, degz, x, y, z, scale  ){
	var object = uvCone(radius,height,slice,noBottom);
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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
function drawSphere( mat, color, radius, slices, stacks, trans, degx, degy, degz, x, y, z, scale  ){
	var object = uvSphere(radius,slices,stacks);
	installModel(object);
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
	bindColor(color, object.vertexPositions.length );
	update(object);
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
