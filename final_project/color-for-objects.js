var red = [
    1, 0, 0,
];
var blue = [
    0, 0, 1,
];
var green = [
    0.137255, 0.556863, 0.137255,
];
var brown = [
    0.35, 0.16, 0.14,
];
var grey = [
    0.329412, 0.329412, 0.329412,
];
var yellow = [
    1, 1, 0,
];
var black = [
    0, 0, 0,
];


function bindColor(color, verNum) {
    ///bind color buffer
    var colors = [];
    for (var i = 0; i < verNum; i++) {
        for (var j = 0; j < 3; j++) {
            colors.push(color[j]);
        }
    }
    color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // bind the color buffer

    // get the attribute location
    a_color_loc = gl.getAttribLocation(shader, "color");

    // point attribute to the volor buffer object
    gl.vertexAttribPointer(a_color_loc, 3, gl.FLOAT, false, 0, 0);

    // enable the color attribute
    gl.enableVertexAttribArray(a_color_loc);
}
