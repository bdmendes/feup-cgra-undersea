import { CGFobject } from '../lib/CGF.js';

export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.object = object;
        this.reset();
    }

    reset() {
        this.axisAngle = [0, 0, 0];
        this.position = [0, 0, 0];
        this.speed = [0, 0, 0];
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position, 0);
        console.log(...this.axisAngle);
        this.scene.rotate(this.axisAngle[0], 1, 0, 0);
        this.scene.rotate(this.axisAngle[1], 0, 1, 0);
        this.scene.rotate(this.axisAngle[2], 0, 0, 1);
        //this.scene.rotate(0, 2, 0, 0);
        this.object.display();
        this.scene.popMatrix();
    }

    update() {
        for (let i = 0; i < 3; ++i) {
            this.position[i] += this.speed[i];
        }
    }

    turn(val) {
        let oldOrientation = this.isTurnedReverse();
        this.axisAngle[1] += val + 2 * Math.PI;
        this.axisAngle[1] %= 2 * Math.PI;
        let newOrientation = this.isTurnedReverse();
        if (oldOrientation != newOrientation) {
            this.speed[2] *= -1;
        }
    }

    accelerate(val) {
        this.speed[2] += val;
    }

    isTurnedReverse() {
        return this.axisAngle[1] >= Math.PI / 2
            && this.axisAngle[1] <= 3 * Math.PI / 2;
    }

}
