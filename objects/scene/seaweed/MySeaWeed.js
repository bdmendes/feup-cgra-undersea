import { CGFappearance } from '../../../lib/CGF.js';
import { MyLighterPyramid } from "../../base/pyramid/MyLighterPyramid.js";

export class MySeaWeed {
    constructor(scene, coords, size, rotation) {
        this.scene = scene;

        if (coords == undefined) this.coords = [0, 0, 0];
        else this.coords = coords;

        if (size == undefined) this.size = [0.2, 0.5, 0.2];
        else this.size = size;

        if (rotation == undefined) this.rotation = 0;
        else this.rotation = rotation;

        this.initObject();
        this.backUpVerts()
        this.initAppearance();
    }

    initObject() {
        this.pyramid = new MyLighterPyramid(this.scene, 4, Math.ceil(this.size[1] * 10.0) * 3);
    }

    backUpVerts() {

        this.buVertices = this.pyramid.vertices.slice();
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.colorIntensity = 0.5 + (Math.random() * 6 / 10.0);
        this.appearance.setAmbient(0.1, 0.3, 0.0, 1);
        this.appearance.setDiffuse(this.colorIntensity / 2, this.colorIntensity, 0.0, 1);
        this.appearance.setSpecular(0.1, 0.5, 0.0, 1);
        this.appearance.setShininess(120);
    }

    update(t) {


        t = t / 1000 % (Math.PI * 2);


        for (var i = 0; i < this.buVertices.length / 3; i++) {

            if (this.buVertices[i * 3 + 1] != 0) {
                this.pyramid.vertices[i * 3] = this.buVertices[i * 3] + this.buVertices[i * 3 + 1] * (Math.sin(this.buVertices[i * 3 + 1] + t));
            }

        }

        this.pyramid.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(...this.coords);
        this.scene.scale(...this.size);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}