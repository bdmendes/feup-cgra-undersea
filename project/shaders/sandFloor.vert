attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

void main() {

    vec2 bTextureCoord = aTextureCoord * (1.0, 1.0) + vec2(timeFactor/100.0, timeFactor/100.0);

    float blue = texture2D(uSampler2, bTextureCoord).b; // 0.0 - 1.0;

    float height = blue;

    vec3 offset = vec3(0.0, 0.0, height / 25.0); 

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}
