import { MyQuad } from "./MyQuad.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad {
    constructor(scene, pX, mX, pY, mY, pZ, mZ) {
        this.scene = scene;
        this.quad = new MyQuad(scene);

        this.defaultTexture = new CGFtexture(this.scene, 'images/part-a/default.png');

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);

        if (pX == undefined) this.pX = this.defaultTexture;
        else this.pX = pX;

        if (mX == undefined) this.mX = this.defaultTexture;
        else this.mX = mX;

        if (pY == undefined) this.pY = this.defaultTexture;
        else this.pY = pY;

        if (mY == undefined) this.mY = this.defaultTexture;
        else this.mY = mY;

        if (pZ == undefined) this.pZ = this.defaultTexture;
        else this.pZ = pZ;

        if (mZ == undefined) this.mZ = this.defaultTexture;
        else this.mZ = mZ;
    }

    initBuffers() {
        this.quad.initBuffers();
    }

    initNormalVizBuffers() {
        this.quad.initNormalVizBuffers();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    betterRes() {
        this.gl = this.scene.gl;
        this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.material.setTexture(this.pZ);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.material.setTexture(this.mZ);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.material.setTexture(this.mY);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.material.setTexture(this.pY);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.material.setTexture(this.pX);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.material.setTexture(this.mX);
        this.material.apply();
        this.betterRes();
        this.quad.display();
        this.scene.popMatrix();
    }

    updateBuffers() {

        // reinitialize buffers
        this.quad.updateBuffers();
        this.initBuffers();
        this.initNormalVizBuffers();
        this.updateTexCoordsGLBuffers();
    }

}
