import { CGFobject } from '../../../lib/CGF.js';
import { MIN_FISH_HEIGHT } from '../../constants.js';
import { MyRock } from "../base/MyRock.js";

export class MyMovingObject {
    constructor(scene, object, nestCoords, nestRadius) {
        this.scene = scene;
        this.object = object;
        this.rock = null;

        if (nestCoords == undefined) this.nestCoords = [0, 0];
        else this.nestCoords = nestCoords;

        if (nestRadius == undefined) this.nestRadius = 2.5;
        else this.nestRadius = nestRadius;

        this.initAnimValues();
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

    initAnimValues(){
        this.animating = false;
        this.startRotation = 0;
        this.endRotation = 0;
        this.startTilt = 0;
        this.endTilt = 0;
        this.stage = 0;
        this.iter = 0;
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

    animationStep(){ //TODO somehow make this prettier
        if (this.stage == 1){
            if(this.iter>=10){
                this.rotation = this.endRotation;
                this.iter = 0;
                this.stage = 2;
            } else{
                this.iter++;
                this.rotation += (this.endRotation - this.startRotation)/10;
                this.tilt += (this.endTilt - this.startTilt)/10;
            }
        }
        else if (this.stage == 2){
            if(this.iter>=10){
                this.rotation = this.startRotation;
                this.iter = 0;
                this.stage = 0;
                this.animating = false;
            } else{
                this.iter++;
                this.rotation -= (this.endRotation - this.startRotation)/10;
                this.tilt -= (this.endTilt - this.startTilt)/10;
            }
        }
    }

    update() {
        this.position[0] += this.speed * this.scene.speedFactor * Math.sin(this.rotation);
        this.position[1] += this.verSpeed;
        this.position[2] += this.speed * this.scene.speedFactor * Math.cos(this.rotation);

        if (this.position[1] < MIN_FISH_HEIGHT){
            this.position[1] = MIN_FISH_HEIGHT;
        }

        if(this.animating){
            this.animationStep();
        } else{
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
        }

        //Calculates the fish's mouth position
        this.mouthPos[0] = this.position[0] + 0.5 * Math.sin(this.rotation) * Math.cos(this.tilt);
        this.mouthPos[1] = this.position[1] - 0.5 * Math.sin(this.tilt);
        this.mouthPos[2] = this.position[2] + 0.5 * Math.cos(this.rotation) * Math.cos(this.tilt)

        //Updates the rocks position, rotation and tilt
        if (this.rock != null && this.stage != 1){
            this.rock.setCoord(this.mouthPos);
            this.rock.setRotation(this.rotation);
            this.rock.setTilt(this.tilt);
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
        if (rock == null || this.rock != null || this.position[1] > MIN_FISH_HEIGHT){
            return;
        }

        this.animating = true;
        this.speed = 0;
        this.verSpeed = 0;

        //Rotation calculations

        var rock_coords = rock.getCoords();
        var vec_fish_rock = [rock_coords[0] - this.position[0], rock_coords[2] - this.position[2]];
        var vec_fish_dir = [Math.sin(this.rotation), Math.cos(this.rotation)];
        var prod_escalar = vec_fish_dir[0]*vec_fish_rock[0] + vec_fish_dir[1]*vec_fish_rock[1];
        var cos_teta = prod_escalar / 
                        (Math.sqrt(Math.pow(vec_fish_rock[0], 2) + Math.pow(vec_fish_rock[1], 2)) *
                         Math.sqrt(Math.pow(vec_fish_dir[0], 2) + Math.pow(vec_fish_dir[1], 2)));
        var teta = Math.acos(cos_teta);
        var normal = vec_fish_dir[0]*vec_fish_rock[1] - vec_fish_dir[1]*vec_fish_rock[0];
        this.startRotation = this.rotation;

        if (normal > 0){
            this.endRotation = this.rotation - teta;
        }
        else{
            this.endRotation = this.rotation + teta;
        }

        //Tilt calculations

        vec_fish_rock = [rock_coords[0] - this.position[0], rock_coords[1] - this.position[1], rock_coords[2] - this.position[2]];
        vec_fish_dir = [vec_fish_rock[0], 0, vec_fish_rock[2]];
        prod_escalar = vec_fish_dir[0]*vec_fish_rock[0] + vec_fish_dir[1]*vec_fish_rock[1] + vec_fish_dir[2]*vec_fish_rock[2];
        cos_teta = prod_escalar / 
                        (Math.sqrt(Math.pow(vec_fish_rock[0], 2) + Math.pow(vec_fish_rock[1], 2) + Math.pow(vec_fish_rock[2], 2)) *
                         Math.sqrt(Math.pow(vec_fish_dir[0], 2) + Math.pow(vec_fish_dir[1], 2 )+ Math.pow(vec_fish_dir[2], 2)));
        teta = Math.acos(cos_teta);
        this.startTilt = this.tilt;
        this.endTilt = teta;

        this.stage = 1;

        this.rock = rock;

        this.rock.pickedUp = true;

    }

    getDist(c1, c2){
        return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2))
    }

    dropRock(){
        


        if (this.getDist(this.rock.getCoords(), [this.nestCoords[0], this.rock.getCoords()[1], this.nestCoords[1]]) < this.nestRadius){
            this.rock.pickedUp = false;
            this.rock = null;
        }

    }

}
