#ifdef GL_ES
precision highp float;
#endif

uniform float timeFactor;
uniform float colorItensity;

void main() {

    gl_FragColor = vec4(colorItensity/2.0, 1.0, 0.0, 1.0);
}