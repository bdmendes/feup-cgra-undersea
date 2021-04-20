import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPlane } from "../base/MyPlane.js";
import { MySphere} from "../base/MySphere.js";

export class MySandFloor {
    constructor(scene){
        this.scene = scene;
        this.initObject();
        this.initAppearance();
        this.initTextures();
    }

    initObject(){
        this.plane = new MySphere(this, 16, 16);
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
        this.appearance.setTexture(this.bodyScales);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        this.scene.pushMatrix();

        this.appearance.apply();
        
        this.plane.display();

        this.scene.popMatrix();

    }


}