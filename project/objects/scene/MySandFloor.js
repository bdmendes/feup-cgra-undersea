import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPlane } from "../base/MyPlane.js";
import { MySphere} from "../base/MySphere.js";

export class MySandFloor {
    constructor(scene, nestCoords, nestRadius){
        this.scene = scene;

        if (nestCoords == undefined) this.nestCoords = [0, 0];
        else this.nestCoords = nestCoords;

        if (nestRadius == undefined) this.nestRadius = 2.5;
        else this.nestRadius = nestRadius;

        this.initObject();
        this.initAppearance();
        this.initTextures();
        this.initShaders();

    }

    initObject(){
        this.plane = new MyPlane(this.scene, 80, 0, 2, 0, 2); //TODO
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.sandTexture = new CGFtexture(this.scene, 'images/part-b/sand.png');
        this.heightMap = new CGFtexture(this.scene, 'images/part-b/sandMap.png');
        this.appearance.setTexture(this.sandTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, 'shaders/sandFloor.vert', 'shaders/sandFloor.frag');
        this.bodyShader.setUniformsValues({ uSampler1: 1, uSampler2: 2, nestPos: this.nestCoords, nestRadius: this.nestRadius});
    }


    display(){

        this.scene.pushMatrix();

        this.appearance.apply();

        this.sandTexture.bind(1);
        this.heightMap.bind(2);

        this.scene.setActiveShader(this.bodyShader);

        this.scene.scale(50, 1, 50);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();

    }

    initNormalVizBuffers(){
        this.plane.initNormalVizBuffers();
    }

    disableNormalViz(){
        this.plane.disableNormalViz();
    }

    enableNormalViz(){
        this.plane.enableNormalViz();
    }


}