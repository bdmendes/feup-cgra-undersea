attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

uniform vec2 topRightPos;
uniform vec2 bottomLeftPos;

void main() {

    float val1 = texture2D(uSampler2, aTextureCoord).b / 20.0;

    float val2 = (texture2D(uSampler2, aTextureCoord).g + texture2D(uSampler2, aTextureCoord).r)/20.0;

    vec3 offset = aVertexPosition + aVertexNormal * val2 - aVertexNormal * val1;

    vec3 bVertexPosition = aVertexPosition + offset;

	gl_Position = uPMatrix * uMVMatrix * vec4(bVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}
