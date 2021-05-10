import { MyMovingObject } from "../base/MyMovingObject.js";

export class MyAnimatedFish extends MyMovingObject {
    constructor(scene, fish, rotationCenter, distance, circleDuration) {
        super(scene, fish);
        this.rotationCenter = rotationCenter === undefined ? [0, 0.5, 0] : rotationCenter;
        this.distance = distance === undefined ? 1 : distance;
        this.circleDuration = circleDuration === undefined ? 10 : circleDuration;
        this.rotation = 0;
    }

    update() {
        this.rotation += (2 * Math.PI / (1000 / this.scene.updatePeriod)) / this.circleDuration;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.translate(0, 0, this.distance);
        this.scene.translate(...this.rotationCenter);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.object.display();
        this.scene.popMatrix();
    }
}