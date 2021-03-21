#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float timeFactor;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

void main() {
    
    vec2 transformedTime = vec2(timeFactor/100.0, timeFactor/100.0);

    vec2 bTextureCoord = (vTextureCoord + transformedTime);
    
    for (int i = 0; i < 100; i++){
        if ( bTextureCoord[0] > 1.0){
            bTextureCoord[0] = bTextureCoord[0] - 1.0;
        }
        else{
            break;
        }
    }

    for (int i = 0; i < 100; i++){
        if ( bTextureCoord[1] > 1.0){
            bTextureCoord[1] = bTextureCoord[1] - 1.0;
        }
        else{
            break;
        }
    }

    vec4 color = texture2D(uSampler1, bTextureCoord);

    gl_FragColor = color;
}