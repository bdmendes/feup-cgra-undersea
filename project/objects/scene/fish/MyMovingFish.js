import { MyMovingObject } from '../../base/MyMovingObject.js'
import { minBackFinSpeedFactor, minSideFinSpeedFactor, MyFish } from './MyFish.js';
import { GRAVITY_ACCEL, NEST_Y, MAX_FALL_SPEED, MIN_FISH_HEIGHT, MAX_FISH_HEIGHT, MIN_Z, MAX_Z, MIN_X, MAX_X } from '../../../constants.js';

const PICK_UP_ANIM = 1;
const THROW_ANIM = 2;

export class MyMovingFish extends MyMovingObject {
    constructor(scene, fish, nestCoords, nestRadius) {
        super(scene, fish);
        this.rock = null;

        if (nestCoords === undefined) this.nestCoords = [0, 0];
        else this.nestCoords = nestCoords;

        if (nestRadius === undefined) this.nestRadius = 2.5;
        else this.nestRadius = nestRadius;

        this.initAnimValues();
        this.reset();
    }

    reset() {
        super.reset();
        this.object.resetFins();
        console.log("here")
        this.mouthPos = [0, 1, 0];
        if (this.rock != null){
            this.rock.reset();
            this.rock = null;
        }
    }

    initAnimValues() {
        this.animating = false;
        this.animationType = 0;
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
        if (val > 0) {
            this.object.rightFinSpeedFactor = minSideFinSpeedFactor + Math.abs(this.speed) * 20;
            this.object.leftFinSpeedFactor = 0;
        } else if (val < 0) {
            this.object.leftFinSpeedFactor = minSideFinSpeedFactor + Math.abs(this.speed) * 20;
            this.object.rightFinSpeedFactor = 0;
        }
    }

    accelerate(val) {
        super.accelerate(val);
        this.object.backFinSpeedFactor = minBackFinSpeedFactor + Math.abs(this.speed) * 20;
    }

    update() {
        this.object.update();

        this.position[0] += this.speed * this.scene.speedFactor * Math.sin(this.rotation);
        this.position[1] += this.verSpeed;
        this.position[2] += this.speed * this.scene.speedFactor * Math.cos(this.rotation);

        if (this.position[1] < MIN_FISH_HEIGHT) {
            this.position[1] = MIN_FISH_HEIGHT;
        }
        else if(this.position[1] > MAX_FISH_HEIGHT){
            this.position[1] = MAX_FISH_HEIGHT;
        }

        if (this.position[0] < MIN_X){
            this.position[0] = MIN_X;
        }
        else if (this.position[0] > MAX_X){
            this.position[0] = MAX_X;
        }
        
        if (this.position[2] < MIN_Z){
            this.position[2] = MIN_Z;
        }
        else if (this.position[2] > MAX_Z){
            this.position[2] = MAX_Z;
        }

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
        this.mouthPos = this.calcMouthPos(this.rotation, this.tilt, this.position);

        //Updates the rocks position, rotation and tilt
        if (this.animating && this.stage == 2 && this.animationType == THROW_ANIM) {
            if (this.rock != null) {
                this.rock.pickedUp = false;
                this.rock = null;
            }
        }
        else if (this.animating && this.animationType == THROW_ANIM) {
            this.rock.setCoord(this.mouthPos);
            this.rock.setRotation(this.rotation);
            this.rock.setTilt(this.tilt);
        }

        if (this.rock != null && this.stage != 1) {
            this.rock.setCoord(this.mouthPos);
            this.rock.setRotation(this.rotation);
            this.rock.setTilt(this.tilt);
        }
    }

    getCoords() {
        return this.position;
    }

    getAnimating() {
        return this.animating;
    }

    pickUpRock(rock) {

        var max_dist = 1.5 * this.scene.scaleFactor; //Math.sqrt(Math.pow(0.5*this.scene.scaleFactor, 2) + Math.pow(0.5*this.scene.scaleFactor, 2));

        console.log(max_dist);

        if (rock == null || this.rock != null || this.position[1] > MIN_FISH_HEIGHT || this.getDist(rock.getCoords(), this.position) > max_dist) {
            return;
        }

        this.animationType = PICK_UP_ANIM;
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

        this.rock.pickedUp = true;

    }

    getDist(c1, c2) {
        return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2))
    }

    calcTarget(init_pos, rotation1, tilt1, speed) {
        var speed_vec = [
            speed * Math.sin(rotation1) * Math.cos(-tilt1),
            speed * Math.sin(-tilt1),
            speed * Math.cos(rotation1) * Math.cos(-tilt1)];

        var a = GRAVITY_ACCEL / 2;
        var b = speed_vec[1];
        var c = init_pos[1] - NEST_Y;

        var t_1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        var t_2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
        var t = Math.max(t_1, t_2);

        var pos_vec = [
            init_pos[0] + speed_vec[0] * t,
            init_pos[1] + speed_vec[1] * t + GRAVITY_ACCEL / 2 * Math.pow(t, 2),
            init_pos[2] + speed_vec[2] * t
        ]

        return pos_vec;
    }

    calcMouthPos(rotation1, tilt1, position1) {
        var mouth_pos1 = [
            position1[0] + 0.5 * this.scene.scaleFactor * Math.sin(rotation1) * Math.cos(tilt1),
            position1[1] - 0.5 * this.scene.scaleFactor * Math.sin(tilt1),
            position1[2] + 0.5 * this.scene.scaleFactor * Math.cos(rotation1) * Math.cos(tilt1)
        ];

        return mouth_pos1;
    }

    dropRock() {

        this.animationType = THROW_ANIM;
        this.animating = true;
        var new_rotation = 0;
        var new_tilt = -Math.PI / 4;
        this.stage = 1;
        this.speed = 0;
        this.verSpeed = 0;

        //rotation calc

        var vec_fish_rock = [this.nestCoords[0] - this.position[0], this.nestCoords[1] - this.position[2]];
        var vec_fish_dir = [Math.sin(this.rotation), Math.cos(this.rotation)];
        var prod_escalar = vec_fish_dir[0] * vec_fish_rock[0] + vec_fish_dir[1] * vec_fish_rock[1];
        var cos_teta = prod_escalar /
            (Math.sqrt(Math.pow(vec_fish_rock[0], 2) + Math.pow(vec_fish_rock[1], 2)) *
                Math.sqrt(Math.pow(vec_fish_dir[0], 2) + Math.pow(vec_fish_dir[1], 2)));
        var teta = Math.acos(cos_teta);
        var normal = vec_fish_dir[0] * vec_fish_rock[1] - vec_fish_dir[1] * vec_fish_rock[0];

        if (normal > 0) {
            new_rotation = this.rotation - teta;
        }
        else {
            new_rotation = this.rotation + teta;
        }

        this.startRotation = this.rotation;
        this.endRotation = new_rotation;
        this.startTilt = this.tilt;
        this.endTilt = new_tilt;

        var new_mouth_pos = this.calcMouthPos(new_rotation, new_tilt, this.position);

        var v1 = 0.0, v2 = 10.0, v3 = 20.0;

        var bottomPos = [new_mouth_pos[0], 0.1, new_mouth_pos[2]];

        var dc = this.getDist(bottomPos, [this.nestCoords[0], 0.1, this.nestCoords[1]])

        var d1_n = 100.0, d2_n = 100.0, d3_n = 100.0;

        var i = 0;

        while (true) {

            var pv1 = this.calcTarget(new_mouth_pos, new_rotation, new_tilt, v1);
            var pv2 = this.calcTarget(new_mouth_pos, new_rotation, new_tilt, v2);
            var pv3 = this.calcTarget(new_mouth_pos, new_rotation, new_tilt, v3);

            d1_n = this.getDist(pv1, [this.nestCoords[0], 0.1, this.nestCoords[1]]);
            d2_n = this.getDist(pv2, [this.nestCoords[0], 0.1, this.nestCoords[1]]);
            d3_n = this.getDist(pv3, [this.nestCoords[0], 0.1, this.nestCoords[1]]);

            var d1_f = this.getDist(pv1, bottomPos);
            var d2_f = this.getDist(pv2, bottomPos);
            var d3_f = this.getDist(pv3, bottomPos);

            if (
                d1_n < this.nestRadius - (this.nestRadius / 2.0) ||
                d2_n < this.nestRadius - (this.nestRadius / 2.0) ||
                d3_n < this.nestRadius - (this.nestRadius / 2.0) ||
                i > 10000) {

                break;
            }

            if (d1_f < dc && d2_f > dc) {
                v3 = v2;
                v2 = (v2 + v1) / 2;
            }
            else if (d2_f < dc && d3_f > dc) {
                v1 = v2;
                v2 = (v2 + v3) / 2;
            }

            i++;
        }

        var df = Math.min(d1_n, d2_n, d3_n);

        var vf = 0;

        if (df == d1_n) {
            vf = v1;
        } else if (df == d2_n) {
            vf = v2;
        } else if (df == d3_n) {
            vf = v3;
        }

        this.rock.speed = [
            vf * Math.sin(new_rotation) * Math.cos(-new_tilt),
            vf * Math.sin(-new_tilt),
            vf * Math.cos(new_rotation) * Math.cos(-new_tilt)];

    }

}
