attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

void main() {

    /*float ang = 36.0 * timeFactor;

    vec2 middleMap = vec2(0.5, 0.5);

    vec2 middleShow = middleMap + vec2(cos(ang), sin(ang)) * vec2(0.25, 0.25);

    vec2 topLeftShow = middleShow - vec2(0.25, 0.25);

    vec2 bTextureCoord = topLeftShow + aTextureCoord * vec2(0.25, 0.25);*/

    vec2 bTextureCoord = aTextureCoord * (1.0, 1.0) + vec2(timeFactor/100.0, timeFactor/100.0);

    for (int i = 0; i < 100; i++){
        if ( bTextureCoord[0] >= 1.0){
            bTextureCoord[0] = bTextureCoord[0] - 1.0;
        }
        else{
            break;
        }
    }

    for (int i = 0; i < 100; i++){
        if ( bTextureCoord[1] >= 1.0){
            bTextureCoord[1] = bTextureCoord[1] - 1.0;
        }
        else{
            break;
        }
    }

    float blue = texture2D(uSampler2, bTextureCoord).b; // 0.0 - 1.0;

    float height = blue;

    vec3 offset = vec3(0.0, 0.0, height / 25.0); 

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}

