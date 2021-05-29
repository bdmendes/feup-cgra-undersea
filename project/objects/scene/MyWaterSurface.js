import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPlane } from "../base/MyPlane.js";

export class MyWaterSurface {
    constructor(scene){
        this.scene = scene;
        this.initObject();
        this.initAppearance();
        this.initTextures();
        this.initShaders();
    }

    initObject(){
        this.plane = new MyPlane(this.scene);
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.pierTexture = new CGFtexture(this.scene, 'images/part-b/pier.jpg');
        this.distortionMap = new CGFtexture(this.scene, 'images/part-b/distortionmap.png');
        this.appearance.setTexture(this.pierTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, 'shaders/waterSurface.vert', 'shaders/waterSurface.frag');
        this.bodyShader.setUniformsValues({ uSampler1: 1, uSampler2: 2, timeFactor: 0});
    }


    display(){

        this.scene.pushMatrix();

        this.appearance.apply();

        this.pierTexture.bind(1);
        this.distortionMap.bind(2);

        this.scene.setActiveShader(this.bodyShader);

        this.scene.scale(50, 1, 50);
        this.scene.translate(0, 10, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

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

    update(t){
        this.bodyShader.setUniformsValues({ timeFactor: t / 1000 % 100 });
    }
}