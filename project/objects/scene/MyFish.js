import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../base/MySphere.js'

export class MyFish {
    constructor(scene) {
        this.scene = scene;
        this.bodySphere = new MySphere(scene, 16, 16);
        //this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.7, 1);
        this.bodySphere.display();
        this.scene.popMatrix();
    }
}