#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
varying vec2 tPos;

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

void main() {
  vec4 scaleColor = texture2D(uSampler2, vTextureCoord);
  if (tPos.t < 0.4) {
    gl_FragColor = vec4(0.55, 0.18, 0.1, 1) * uLight[0].diffuse;  // feup color
  } else {
    gl_FragColor = scaleColor * uLight[0].diffuse;
  }
}