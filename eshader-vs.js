uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;
attribute vec3 vPos;
attribute vec3 vCol;
varying vec3 varCol;
void main(void)
{
	vec4 f_Position = vec4(vPos, 1.0);
	f_Position = model * f_Position;
	f_Position *= 0.5;
	varCol = vCol;
    gl_Position = f_Position;
}
