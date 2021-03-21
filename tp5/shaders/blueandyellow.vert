attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 posCopy;


uniform float normScale;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + vec3(sin(normScale)*20.0, 0.0, 0.0), 1.0) ;
	posCopy = gl_Position;
}

