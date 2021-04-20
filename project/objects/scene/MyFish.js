import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from '../base/MySphere.js'
import { MyTriangle } from '../base/MyTriangle.js'

export class MyFish {
    constructor(scene) {
        this.scene = scene;
        this.initObjects();
        this.initAppearance();
        this.initTextures();
        this.initShaders();
    }

    initObjects() {
        this.body = new MySphere(this.scene, 16, 16);
        this.eye = new MySphere(this.scene, 16, 16);
        this.fin = new MyTriangle(this.scene);
    }

    initAppearance() {
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(1, 1, 1, 1);
        this.bodyMaterial.setDiffuse(1, 1, 1, 1);
        this.bodyMaterial.setSpecular(1, 1, 1, 1);
        this.bodyMaterial.setShininess(120);

        this.finMaterial = new CGFappearance(this.scene);
        this.finMaterial.setAmbient(1, 1, 1, 1);
        this.finMaterial.setDiffuse(1, 1, 1, 1);
        this.finMaterial.setSpecular(1, 1, 1, 1);
        this.finMaterial.setShininess(120);
        this.finMaterial.setColor(0.55, 0.18, 0.1, 1);
    }

    initTextures() {
        this.bodyScales = new CGFtexture(this.scene, 'images/part-b/fish_scales/fish_scales_2.png');
        this.bodyMaterial.setTexture(this.bodyScales);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, './shaders/bodyFish.vert', './shaders/bodyFish.frag');
        this.bodyShader.setUniformsValues({ uSampler2: 1 });
    }

    display() {

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.8, 1); // global fish distortion

        /* Fish body */
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.bodyScales.bind(1);
        this.scene.setActiveShader(this.bodyShader);
        this.body.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Fish left eye */
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 10, 0, 0, 1);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.translate(0.85, 0, 0);
        this.scene.scale(0.2, 0.2, 0.15);
        this.eye.display();
        this.scene.popMatrix();

        /* Fish right eye */
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 10, 0, 0, 1);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.translate(-0.85, 0, 0);
        this.scene.scale(0.2, 0.2, 0.15);
        this.eye.display();
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

        this.scene.popMatrix();
    }
}