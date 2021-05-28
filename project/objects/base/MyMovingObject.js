import { MIN_FISH_HEIGHT } from "../../constants.js";

export class MyMovingObject {

    constructor(scene, object, nestCoords, nestRadius) {
        this.scene = scene;
        this.object = object;
        this.reset();
    }

    reset() {
        this.rotation = 0;
        this.tilt = 0;
        this.position = [0, 1, 0];
        this.speed = 0;
        this.verSpeed = 0;
    }

    displayNSO() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(this.tilt, 1, 0, 0);
        this.object.displayNSO();
        this.scene.popMatrix();
    }

    displaySO() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(this.tilt, 1, 0, 0);
        this.object.displaySO();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] += this.speed * Math.sin(this.rotation);
        this.position[1] += this.verSpeed;
        this.position[2] += this.speed * Math.cos(this.rotation);

        if (this.position[1] < MIN_FISH_HEIGHT) {
            this.position[1] = MIN_FISH_HEIGHT;
        }
        
    }

    turn(val) {
        this.rotation += val + 2 * Math.PI;
        this.rotation %= 2 * Math.PI;
    }

    accelerate(val) {
        this.speed += val;
    }

    setVerticalSpeed(val) {
        this.verSpeed = val;
    }

    getCoords() {
        return this.position;
    }

    getObject() {
        return this.object;
    }

    getRotation() {
        return this.rotation;
    }

    getTilt() {
        return this.tilt;
    }
}
