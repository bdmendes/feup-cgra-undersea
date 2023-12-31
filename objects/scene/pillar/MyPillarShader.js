import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyLightCylinder } from "../../base/cylinder/MyLightCylinder.js";

export class MyPillarShader {
    constructor(scene){
        this.scene = scene;
        this.initObject();
        this.initAppearance();
        this.initTextures();
        this.initShaders();
    }

    initObject(){
        this.pillar = new MyLightCylinder(this.scene, 64, 64);
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.pillarTexture = new CGFtexture(this.scene, 'images/part-b/pillarTexture.png');
        this.bumpMap = new CGFtexture(this.scene, 'images/part-b/pillarMap.png');
        this.appearance.setTexture(this.pillarTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, 'shaders/pillarShader.vert', 'shaders/pillarShader.frag');
        this.bodyShader.setUniformsValues({ uSampler1: 1, uSampler2: 2});
    }


    display(){

        this.scene.pushMatrix();

        this.appearance.apply();

        this.pillarTexture.bind(1);
        this.bumpMap.bind(2);

        this.scene.setActiveShader(this.bodyShader);

        this.pillar.display();

        this.scene.popMatrix();

    }

}
