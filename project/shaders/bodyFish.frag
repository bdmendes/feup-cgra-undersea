#ifdef GL_ES
precision highp float;
#endif

varying highp vec2 vTextureCoord;
varying highp vec4 vLighting;

uniform sampler2D uSampler2;
uniform float r;
uniform float g;
uniform float b;
uniform float headPortion;

void main() {
    vec4 scaleColor = texture2D(uSampler2, vTextureCoord);
    if (scaleColor.b < 0.8 || vTextureCoord.t < headPortion) {
        scaleColor = vec4(r, g, b, 1);
    }
    gl_FragColor = scaleColor * vLighting;
}
