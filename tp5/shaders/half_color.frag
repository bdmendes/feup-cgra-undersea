#ifdef GL_ES
precision highp float;
#endif

varying vec3 vertexCoords;

void main() {
  gl_FragColor = vertexCoords.y >= 0.5 ? vec4(1.0, 1.0, 0.0, 1.0)
                                       : vec4(0.4078, 0.2157, 0.7725, 1.0);
}