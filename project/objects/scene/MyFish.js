import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from '../base/MySphere.js'
import { MyTriangle } from '../base/MyTriangle.js'

export class MyFish {
    constructor(scene) {
        this.scene = scene;
        this.initObjects();
        this.initMaterials();
        this.initShaders();
    }

    initObjects() {
        this.body = new MySphere(this.scene, 32, 32);
        this.eye = new MySphere(this.scene, 32, 32);
        this.fin = new MyTriangle(this.scene);
    }

    initMaterials() {
        /* Body */
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyScales = new CGFtexture(this.scene, 'images/part-b/fish/fish_scales_2.png');
        this.bodyMaterial.setTexture(this.bodyScales);

        /* Fin */
        this.finMaterial = new CGFappearance(this.scene);
        this.finMaterial.setColor(0.55, 0.18, 0.1, 1);

        /* Eye */
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeTexture = new CGFtexture(this.scene, 'images/part-b/fish/fish_eye.jpg');
        this.eyeMaterial.setTexture(this.eyeTexture);
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, './shaders/bodyFish.vert', './shaders/bodyFish.frag');
        this.bodyShader.setUniformsValues({ uSampler2: 1 });
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.8, 1); // global fish distortion

        /* Body */
        this.scene.pushMatrix();
        this.bodyScales.bind(1);
        this.scene.setActiveShader(this.bodyShader);
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.body.display();
        this.scene.defaultAppearance.apply();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

        /* Left eye */
        this.scene.pushMatrix();
        this.eyeMaterial.apply();
        this.scene.rotate(Math.PI / 10, 0, 0, 1);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.translate(0.90, 0, 0);
        this.scene.scale(0.2, 0.2, 0.15);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.eye.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Right eye */
        this.scene.pushMatrix();
        this.eyeMaterial.apply();
        this.scene.rotate(-Math.PI / 10, 0, 0, 1);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.translate(-0.90, 0, 0);
        this.scene.scale(0.2, 0.2, 0.15);
        this.eye.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Back fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(0, 0, -1);
        this.scene.scale(1, 0.7, 0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Top fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(0, 0.7, -0.3);
        this.scene.scale(1, 0.61, 0.61);
        this.scene.rotate(5 * Math.PI / 4, 1, 0, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Left fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(1.03, -0.9, 0.25);
        this.scene.scale(0.5, 0.4, 0.5);
        this.scene.rotate(Math.PI / 18, 0, 0, 1);
        this.scene.rotate(3 * Math.PI / 4, 1, 0, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Right fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(-1.03, -0.9, 0.25);
        this.scene.scale(0.5, 0.4, 0.5);
        this.scene.rotate(-Math.PI / 18, 0, 0, 1);
        this.scene.rotate(3 * Math.PI / 4, 1, 0, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}