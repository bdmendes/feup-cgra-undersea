#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
varying vec2 tPos;

void main() {
  vec4 scaleColor = texture2D(uSampler2, vTextureCoord);
  if (tPos.t < 0.4) {
    gl_FragColor = vec4(0.55, 0.18, 0.1, 1);  // feup color
  } else {
    gl_FragColor = scaleColor;
  }
}