#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

uniform float timeFactor;

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

    vec2 cTextureCoord = vTextureCoord + vec2(timeFactor/100.0, timeFactor/100.0);
    
    vec4 distortionMap = texture2D(uSampler2, cTextureCoord);

    float s_offset = (distortionMap.r - 0.5)/6.0;
    float t_offset = (distortionMap.g - 0.5)/6.0;

    vec2 bTextureCoord = vTextureCoord;

    if(bTextureCoord.s + s_offset > 0.0 && bTextureCoord.s + s_offset < 1.0){
        bTextureCoord.s += s_offset;
    }
    else{
        bTextureCoord.s -= s_offset;
    }
    
    if(bTextureCoord.t + t_offset > 0.0 && bTextureCoord.t + t_offset < 1.0){
        bTextureCoord.t += t_offset;
    }
    else{
        bTextureCoord.t -= t_offset;
    }

    vec4 color = texture2D(uSampler1, bTextureCoord);

    gl_FragColor = color * uLight[0].diffuse;
}