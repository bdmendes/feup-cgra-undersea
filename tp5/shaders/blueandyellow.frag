#ifdef GL_ES
precision highp float;
#endif

varying vec4 posCopy;

void main() {

    if (posCopy.y > 0.5){
        gl_FragColor =  vec4(0.9, 0.9, 0.2, 1.0);
    }
    else {
        gl_FragColor =  vec4(0.6, 0.6, 0.9, 1.0);
    }
		
}