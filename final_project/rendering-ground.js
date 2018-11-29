function drawGround(mat, location, size) {
  if (size != null) {
    mat4.scale(mat, mat, size);
  }
  if (location != null) {
    mat4.translate(mat, mat, location);
  }
  drawRing(mat, grey, 1, 0.5, 32, [0, 4, 0], degToRad(90), null, null, [1, 0, 0], null, null, [2, 2, 2]);
  drawCylinder(mat, green, 3, 0.3, 32, 1, 0, null, degToRad(90), null, null, [1, 0, 0], null, null, null);
  if (location != null) {
    mat4.translate(mat, mat, [-location[0], -location[1], -location[2]]);
  }
  if (size != null) {
    mat4.scale(mat, mat, [1 / size[0], 1 / size[1], 1 / size[2]]);
  }
}
