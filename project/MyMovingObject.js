import { CGFobject } from '../lib/CGF.js';

export class MyMovingObject extends CGFobject {
    constructor(scene, yAxisAngle, x, y, z) {
        super(scene);
        this.yAxisAngle = yAxisAngle;
        this.x = x;
        this.y = y;
        this.z = z;
        this.verticesPosAverage = [null, null, null];
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.setXTranslation(),
            this.setYTranslation(), this.setZTranslation());
        super.display();
        this.scene.popMatrix();
    }
    setXTranslation() {
        return this.x - this.getPosAverage(0);
    }
    setYTranslation() {
        return this.y - this.getPosAverage(1);
    }
    setZTranslation() {
        return this.z - this.getPosAverage(2);
    }
    getPosAverage(index) {
        if (this.verticesPosAverage[index] != null) {
            return this.verticesPosAverage[index];
        }
        let posV = [];
        for (let i = index; i < this.vertices.length; i += 3) {
            if (!posV.includes(this.vertices[i])) posV.push(this.vertices[i]);
        }
        this.verticesPosAverage[index] = posV.reduce((a, b) => a + b, 0) / posV.length;
        return this.verticesPosAverage[index];
    }
}
