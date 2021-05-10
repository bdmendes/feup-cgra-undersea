import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPyramid } from "../base/MyPyramid.js";

export class MySeaWeed {
    constructor(scene, coords, size, rotation){
        this.scene = scene;
        this.radius = 1.0;

        if (coords == undefined) this.coords = [0, 0, 0];
        else this.coords = coords;

        if (size == undefined) this.size = [0.2, 0.5, 0.2];
        else this.size = size;

        if (rotation == undefined) this.rotation = 0;
        else this.rotation = rotation;

        this.initObject();
        this.initAppearance();
    }

    initObject(){
        this.pyramid = new MyPyramid(this.scene, 2, 1)
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        var greenIntensity = 0.75 + (Math.random() * 6.0 / 10.0 - 0.25);
        this.appearance.setAmbient(0.0, 0.3, 0.0, 1);
        this.appearance.setDiffuse(0.0, greenIntensity, 0.0, 1);
        this.appearance.setSpecular(0.0, 0.5, 0.0, 1);
        this.appearance.setShininess(120);
    }

    display(){
        this.scene.pushMatrix();
        this.appearance.apply();        
        this.scene.translate(...this.coords);
        this.scene.scale(...this.size);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0 ,0);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}