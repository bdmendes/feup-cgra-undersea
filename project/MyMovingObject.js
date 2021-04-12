import { CGFobject } from '../lib/CGF.js';

export class MyMovingObject {
    constructor(scene, object) {
        this.scene = scene;
        this.object = object;
        this.reset();
    }

    reset() {
        this.axisAngle = [0, 0, 0];
        this.position = [0, 0, 0];
        this.speed = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position, 0);
        this.scene.rotate(this.axisAngle[0], 1, 0, 0);
        this.scene.rotate(this.axisAngle[1], 0, 1, 0);
        this.scene.rotate(this.axisAngle[2], 0, 0, 1);
        this.object.display();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] += this.speed * this.scene.speedFactor * Math.sin(this.axisAngle[1]);
        this.position[2] += this.speed * this.scene.speedFactor * Math.cos(this.axisAngle[1]);
    }

    turn(val) {
        this.axisAngle[1] += val + 2 * Math.PI;
        this.axisAngle[1] %= 2 * Math.PI;
    }

    accelerate(val) {
        this.speed += val;
    }
}
