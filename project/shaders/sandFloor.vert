attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

uniform vec2 nestPos;
uniform float nestRadius;


void main() {

    float height = (texture2D(uSampler2, aTextureCoord).r + texture2D(uSampler2, aTextureCoord).g + texture2D(uSampler2, aTextureCoord).b) / 3.0;

    vec3 offset = vec3(0.0, 0.0, height - 0.5) * 1.5;

    vec3 bVertexPosition = aVertexPosition + offset;
                                                                //This + because for some reason the y coord is inverted
    float dist = sqrt(pow(bVertexPosition.x - nestPos[0]/50.0, 2.0) + pow(bVertexPosition.y + nestPos[1]/50.0, 2.0));
    if(dist <= (nestRadius + 0.1)/50.0 && dist >= (nestRadius - 0.1)/50.0){
        bVertexPosition.z = 0.05;
    }
    else if(dist < (nestRadius - 0.1)/50.0){
        bVertexPosition.z = -5.0;
    }  

	gl_Position = uPMatrix * uMVMatrix * vec4(bVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;
}
