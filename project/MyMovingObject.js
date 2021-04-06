import { CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";

export class MyMovingObject extends CGFobject {
    constructor(scene, object, yAxisAngle, x, y, z) {
        super(scene);
        this.yAxisAngle = yAxisAngle;
        this.x = x;
        this.y = y;
        this.z = z;
        this.verticesPosAverage = [null, null, null]; 
        this.object = object;
    }
    display() {
        this.scene.pushMatrix();

        this.pyramid.display();
        
        this.scene.popMatrix();
    }

}
