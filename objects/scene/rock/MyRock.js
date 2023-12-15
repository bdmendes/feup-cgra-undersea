import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { GRAVITY_ACCEL, NEST_Y, MAX_FALL_SPEED } from '../../../constants.js';
import { MySphere } from "../../base/MySphere.js";

export class MyRock {
    constructor(scene, width, length, height, x, y, z){


        this.scene = scene;
        this.initObject();
        this.initMods();
        this.initAppearance();
        this.initTextures();

        if (width == undefined) this.width = 1;
        else this.width = width;

        if (length == undefined) this.length = 1;
        else this.length = length;

        if(height == undefined) this.height = 1;
        else this.height = height;

        if (x == undefined) this.x = 0;
        else this.x = x;

        if (y == undefined) this.y = 0;
        else this.y = y;

        if (z == undefined) this.z = 0;
        else this.z = z;

        this.originalPos = [x, y, z];

        this.pickedUp = false;
        this.speed = [0, 0, 0];
        this.rotation = 0.0;
        this.tilt = 0.0;

    }

    reset(){
        this.pickedUp = false;
        this.speed = [0, 0, 0];
        this.rotation = 0.0;
        this.tilt = 0.0;

        this.x = this.originalPos[0];
        this.y = this.originalPos[1];
        this.z = this.originalPos[2];
    }

    update(){
        if (this.y != NEST_Y && !this.pickedUp){
            this.speed[1] += GRAVITY_ACCEL;
               
            this.x += this.speed[0];
            this.y += this.speed[1];
            this.z += this.speed[2];
        

            if(this.y < NEST_Y){
                this.y = NEST_Y;
                this.speed = [0, 0, 0];
            }
        }
    }

    setCoord(coords){
        this.x = coords[0];
        this.y = coords[1];
        this.z = coords[2];
    }

    getCoords(){
        return [this.x, this.y, this.z];
    }

    setRotation(rotation){
        this.rotation = rotation;
    }

    setTilt(tilt){
        this.tilt = tilt;
    }

    initObject(){
        this.sphere = new MySphere(this.scene, 16, 16);
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.stoneTexture = new CGFtexture(this.scene, 'images/part-b/stone.png');
        this.appearance.setTexture(this.stoneTexture);
    }

    initMods(){

        for (var i = 0; i < this.sphere.vertices.length/3; i++){

            var rand = (Math.random() * 100)/500;

            this.sphere.vertices[i*3 + 0] -= this.sphere.normals[i*3 + 0] * rand;
            this.sphere.vertices[i*3 + 1] -= this.sphere.normals[i*3 + 1] * rand;
            this.sphere.vertices[i*3 + 2] -= this.sphere.normals[i*3 + 2] * rand;
        }

        this.sphere.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();

        this.appearance.apply();        

        this.scene.translate(this.x, this.y, this.z);        

        this.scene.rotate(this.rotation, 0, 1, 0);
        
        this.scene.rotate(this.tilt, 1, 0, 0);

        this.scene.scale(this.width, this.height, this.length);

        this.scene.scale(0.2, 0.2, 0.2);

        this.sphere.display();

        this.scene.popMatrix();
    }
}