import { MyMovingObject } from '../base/MyMovingObject.js'
import { MyRock } from '../base/MyRock.js';
import { minBackFinSpeedFactor, minSideFinSpeedFactor, MyFish } from './MyFish.js';

const PICK_UP_ANIM = 1;
const THROW_ANIM = 2;

export class MyMovingFish extends MyMovingObject {
    constructor(scene) {
        super(scene, new MyFish(scene));
        this.initAnimValues();
    }

    reset() {
        super.reset();
        this.object.resetFins();
        this.mouthPos = [0, 1, 0];
    }

    initAnimValues() {
        this.animating = false;
        this.startRotation = 0;
        this.endRotation = 0;
        this.startTilt = 0;
        this.endTilt = 0;
        this.stage = 0;
        this.iter = 0;
    }

    animationStep() { //TODO somehow make this prettier
        if (this.stage == 1) {
            if (this.iter >= 10) {
                this.rotation = this.endRotation;
                this.iter = 0;
                this.stage = 2;
            } else {
                this.iter++;
                this.rotation += (this.endRotation - this.startRotation) / 10;
                this.tilt += (this.endTilt - this.startTilt) / 10;
            }
        }
        else if (this.stage == 2) {
            if (this.iter >= 10) {
                this.rotation = this.startRotation;
                this.iter = 0;
                this.stage = 0;
                this.animating = false;
            } else {
                this.iter++;
                this.rotation -= (this.endRotation - this.startRotation) / 10;
                this.tilt -= (this.endTilt - this.startTilt) / 10;
            }
        }
    }

    turn(val) {
        super.turn(val);
        const firstOrThirdQuadrant = function (rotation) {
            return rotation <= Math.PI / 2 ||
                (rotation > Math.PI && rotation <= 3 * Math.PI / 2);
        }
        if (firstOrThirdQuadrant(this.rotation)) {
            this.object.leftFinSpeedFactor = minSideFinSpeedFactor + Math.abs(this.speed) * 20;
            this.object.rightFinSpeedFactor = minSideFinSpeedFactor;
        } else {
            this.object.rightFinSpeedFactor = minSideFinSpeedFactor + Math.abs(this.speed) * 20;
            this.object.leftFinSpeedFactor = minSideFinSpeedFactor;
        }
    }

    accelerate(val) {
        super.accelerate(val);
        this.object.backFinSpeedFactor = minBackFinSpeedFactor + Math.abs(this.speed) * 20;
    }

    update() {
        super.update();

        if (this.animating) {
            this.animationStep();
        } else {
            if (this.verSpeed != 0 && this.speed != 0) {
                var h = Math.sqrt(Math.pow(this.speed, 2) + Math.pow(this.verSpeed, 2));
                this.tilt = Math.asin(this.verSpeed / h) * ((this.speed > 0) ? -1 : 1);
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
        if (this.rock != null && this.stage != 1) {
            this.rock.setCoord(this.mouthPos);
            this.rock.setRotation(this.rotation);
            this.rock.setTilt(this.tilt);
        }
    }

    getAnimating() {
        return this.animating;
    }

    pickUpRock(rock) {
        if (rock == null || this.rock != null) {
            return;
        }

        this.animating = true;
        this.speed = 0;
        this.verSpeed = 0;

        //Rotation calculations

        var rock_coords = rock.getCoords();
        var vec_fish_rock = [rock_coords[0] - this.position[0], rock_coords[2] - this.position[2]];
        var vec_fish_dir = [Math.sin(this.rotation), Math.cos(this.rotation)];
        var prod_escalar = vec_fish_dir[0] * vec_fish_rock[0] + vec_fish_dir[1] * vec_fish_rock[1];
        var cos_teta = prod_escalar /
            (Math.sqrt(Math.pow(vec_fish_rock[0], 2) + Math.pow(vec_fish_rock[1], 2)) *
                Math.sqrt(Math.pow(vec_fish_dir[0], 2) + Math.pow(vec_fish_dir[1], 2)));
        var teta = Math.acos(cos_teta);
        var normal = vec_fish_dir[0] * vec_fish_rock[1] - vec_fish_dir[1] * vec_fish_rock[0];
        this.startRotation = this.rotation;

        if (normal > 0) {
            this.endRotation = this.rotation - teta;
        }
        else {
            this.endRotation = this.rotation + teta;
        }

        //Tilt calculations

        vec_fish_rock = [rock_coords[0] - this.position[0], rock_coords[1] - this.position[1], rock_coords[2] - this.position[2]];
        vec_fish_dir = [vec_fish_rock[0], 0, vec_fish_rock[2]];
        prod_escalar = vec_fish_dir[0] * vec_fish_rock[0] + vec_fish_dir[1] * vec_fish_rock[1] + vec_fish_dir[2] * vec_fish_rock[2];
        cos_teta = prod_escalar /
            (Math.sqrt(Math.pow(vec_fish_rock[0], 2) + Math.pow(vec_fish_rock[1], 2) + Math.pow(vec_fish_rock[2], 2)) *
                Math.sqrt(Math.pow(vec_fish_dir[0], 2) + Math.pow(vec_fish_dir[1], 2) + Math.pow(vec_fish_dir[2], 2)));
        teta = Math.acos(cos_teta);
        this.startTilt = this.tilt;
        this.endTilt = teta;



        this.stage = 1;

        this.rock = rock;

    }

}
