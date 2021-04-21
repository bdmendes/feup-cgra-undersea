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

    float height = (texture2D(uSampler2, aTextureCoord).r + texture2D(uSampler2, aTextureCoord).g + texture2D(uSampler2, aTextureCoord).b) / 3.0;

    vec3 offset = vec3(0.0, 0.0, height) / 10.0;

    vec3 bVertexPosition = aVertexPosition + offset;

    if(bVertexPosition.x > bottomLeftPos[0]/50.0 && bVertexPosition.y > bottomLeftPos[1]/50.0 && bVertexPosition.x < topRightPos[0]/50.0 && bVertexPosition.y < topRightPos[1]/50.0){
        bVertexPosition.z = -5.0;
    }  

	gl_Position = uPMatrix * uMVMatrix * vec4(bVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}
