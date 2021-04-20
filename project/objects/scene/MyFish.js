import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from '../base/MySphere.js'

export class MyFish {
    constructor(scene) {
        this.scene = scene;
        this.initObjects();
        this.initAppearance();
        this.initTextures();
        this.initShaders();
    }

    initObjects() {
        this.bodySphere = new MySphere(this.scene, 16, 16);
    }

    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures() {
        this.bodyScales = new CGFtexture(this.scene, 'images/part-b/fish_scales/fish_scales_2.png');
        this.appearance.setTexture(this.bodyScales);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, './shaders/bodyFish.vert', './shaders/bodyFish.frag');
        this.bodyShader.setUniformsValues({ uSampler2: 1 });
    }

    display() {
        this.appearance.apply();
        this.scene.setActiveShader(this.bodyShader);
        this.scene.pushMatrix();
        this.bodyScales.bind(1);
        this.scene.scale(0.5, 0.7, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.bodySphere.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.defaultAppearance.apply();
    }
}