#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float timeFactor;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;

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
    
    vec2 transformedTime = vec2(timeFactor/100.0, timeFactor/100.0);

    vec2 bTextureCoord = (vTextureCoord + transformedTime);
    
    /*
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
    }*/

    float blue = texture2D(uSampler2, bTextureCoord).b / 8.0; // 0.0 - 1.0;

    vec4 color = texture2D(uSampler1, bTextureCoord) - vec4(blue, blue, blue, 0.0);

    gl_FragColor = color * uLight[0].diffuse;
}