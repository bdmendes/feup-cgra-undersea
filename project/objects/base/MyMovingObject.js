import { CGFobject } from '../../../lib/CGF.js';
import { MyRock } from "../base/MyRock.js";

export class MyMovingObject {
    constructor(scene, object) {
        this.scene = scene;
        this.object = object;
        this.animating = false;
        this.rock = null;
        this.reset();
    }

    reset() {
        this.rotation = 0;
        this.tilt = 0;
        this.position = [0, 1, 0];
        this.mouthPos = [0, 1, 0];
        this.speed = 0;
        this.verSpeed = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(this.tilt, 1, 0, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.object.display();
        this.scene.popMatrix();
    }

    update() {
        this.position[0] += this.speed * this.scene.speedFactor * Math.sin(this.rotation);
        this.position[1] += this.verSpeed;
        this.position[2] += this.speed * this.scene.speedFactor * Math.cos(this.rotation);

        if (this.position[1] < 0.5){
            this.position[1] = 0.5;
        }

        if (this.verSpeed != 0 && this.speed != 0) {
            var h = Math.sqrt(Math.pow(this.speed, 2) + Math.pow(this.verSpeed, 2));
            this.tilt = Math.asin(this.verSpeed / h) * ((this.speed > 0) ? -1 : 1);
            console.log(h);
        }
        else if (this.verSpeed != 0) {
            this.tilt = Math.PI / 2 * ((this.verSpeed > 0) ? -1 : 1);
        }
        else {
            this.tilt = 0;
        }

        this.mouthPos[0] = this.position[0] + 0.5 * Math.sin(this.rotation) * Math.cos(this.tilt);
        this.mouthPos[1] = this.position[1] - 0.5 * Math.sin(this.tilt);
        this.mouthPos[2] = this.position[2] + 0.5 * Math.cos(this.rotation) * Math.cos(this.tilt)

        if (this.rock != null){
            this.rock.setCoord(this.mouthPos);
            //this.rock.setRotation(this.rotation);
            //this.rock.setTilt(this.setTilt);
        }

    }

    turn(val) {
        this.rotation += val + 2 * Math.PI;
        this.rotation %= 2 * Math.PI;
    }

    accelerate(val) {
        this.speed += val;
    }

    verAccel(val) {
        this.verSpeed = val;
    }

    getCoords(){
        return this.position;
    }

    getObject() {
        return this.object;
    }

    getMouthPos(){
        return this.mouthPos;
    }

    getRotation(){
        return this.rotation;
    }

    getTilt(){
        return this.tilt;
    }

    getAnimating(){
        return this.animating;
    }

    pickUpRock(rock){
        if (rock == null){
            return;
        }

        this.rock = rock;

        this.animating = true;
        this.speed = 0;
        this.verSpeed = 0;



    }

}
