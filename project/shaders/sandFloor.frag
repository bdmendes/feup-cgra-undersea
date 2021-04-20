#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

void main() {
    
    vec2 transformedTime = vec2(timeFactor/100.0, timeFactor/100.0);

    vec2 bTextureCoord = (vTextureCoord + transformedTime);

    float blue = texture2D(uSampler2, bTextureCoord).b / 8.0; // 0.0 - 1.0;

    vec4 color = texture2D(uSampler1, bTextureCoord) - vec4(blue, blue, blue, 0.0);

    gl_FragColor = color * uLight[0].diffuse;
}