#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec3 vVertexPositon;
varying vec3 vVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

void main() {

    vVertexNormal = aVertexNormal;

    vec3 bVertexPosition = vec3(

        aVertexPosition[0] + aVertexPosition[1] * sin(aVertexPosition[1] * 3.0 + timeFactor) * 2.0,
        aVertexPosition[1],
        aVertexPosition[2]
        
        );

    vVertexPositon = bVertexPosition;

	gl_Position = uPMatrix * uMVMatrix * vec4(bVertexPosition, 1.0);

}