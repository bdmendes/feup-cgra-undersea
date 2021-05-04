#ifdef GL_ES
precision highp float;
#endif

varying highp vec2 vTextureCoord;
varying highp vec4 vLighting;

uniform sampler2D uSampler2;

void main() {
  vec4 scaleColor = texture2D(uSampler2, vTextureCoord);
  if (vTextureCoord.t < 0.4) {
    gl_FragColor = vec4(0.55, 0.18, 0.1, 1) * vLighting;
  } else {
    gl_FragColor = scaleColor * vLighting;
  }
}
