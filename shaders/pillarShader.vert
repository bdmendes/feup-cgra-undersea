attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec3 vVertexPositon;
varying vec3 vVertexNormal;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

uniform vec2 topRightPos;
uniform vec2 bottomLeftPos;

void main() {

    float red = texture2D(uSampler2, aTextureCoord).r / 50.0;
    float green = texture2D(uSampler2, aTextureCoord).g / 30.0;

    vec3 offset = aVertexNormal * (green-red);

    vec3 bVertexPosition = aVertexPosition + offset;

	gl_Position = uPMatrix * uMVMatrix * vec4(bVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;
    vVertexPositon = aVertexPosition;
}
