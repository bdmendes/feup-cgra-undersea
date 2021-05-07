import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPlane } from "../base/MyPlane.js";

export class MyFishNest {
    constructor(scene, coords, radius){
        this.scene = scene;
        this.initObject();
        this.initAppearance();
        this.initTextures();
        this.initShaders();

        if (coords == undefined) this.coords = [0, 0];
        else this.coords = coords;

        if (radius == undefined) this.radius = 2.5;
        else this.radius = radius;
    }

    getCoord(){
        return this.coords;
    }

    getRadius(){
        return this.radius;
    }

    initObject(){
        this.plane = new MyPlane(this.scene, 40); //40 min 80 good 160 wonderful
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.sandTexture = new CGFtexture(this.scene, 'images/part-b/sandQuarter.png');
        this.heightMap = new CGFtexture(this.scene, 'images/part-b/fishNestMap2.png');
        this.appearance.setTexture(this.sandTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, 'shaders/fishNest.vert', 'shaders/fishNest.frag');
        this.bodyShader.setUniformsValues({ uSampler1: 1, uSampler2: 2});
    }


    display(){

        this.scene.pushMatrix();

        this.appearance.apply();

        this.sandTexture.bind(1);
        this.heightMap.bind(2);

        this.scene.translate(this.coords[0], 0, this.coords[1]);
        this.scene.setActiveShader(this.bodyShader);
        this.scene.scale(this.radius * 2, 1, this.radius * 2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}