import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from "../base/MySphere.js";

export class MyRock {
    constructor(scene){
        this.scene = scene;
        this.initObject();
        this.initMods();
        this.initAppearance();
        this.initTextures();
    }

    initObject(){
        this.sphere = new MySphere(this.scene, 16, 16); //TODO
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.stoneTexture = new CGFtexture(this.scene, 'images/part-b/stone.png');
        this.appearance.setTexture(this.stoneTexture);
    }

    initMods(){

        for (var i = 0; i < this.sphere.vertices.length/3; i++){

            var rand = (Math.random() * 100)/500;

            this.sphere.vertices[i*3 + 0] -= this.sphere.normals[i*3 + 0] * rand;
            this.sphere.vertices[i*3 + 1] -= this.sphere.normals[i*3 + 1] * rand;
            this.sphere.vertices[i*3 + 2] -= this.sphere.normals[i*3 + 2] * rand;
        }

        this.sphere.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();

        this.appearance.apply();

        this.scene.scale(0.2, 0.2, 0.2);

        this.sphere.display();

        this.scene.popMatrix();
    }
}