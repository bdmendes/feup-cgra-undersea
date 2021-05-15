import { CGFappearance, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MySphere } from '../base/MySphere.js'
import { MyTriangle } from '../base/MyTriangle.js'

const maxBackFinRotation = Math.PI / 6;
const maxSideFinRotation = [Math.PI / 12, Math.PI / 12, 0];
export const minSideFinSpeedFactor = 0.4;
export const minBackFinSpeedFactor = 0.4;

export class MyFish {
    constructor(scene, color, headPortion, texturePath) {
        this.scene = scene;
        this.color = color === undefined ?
            [0.55, 0.18, 0.1, 1] : color;
        console.log("color" + color);
        this.headPortion = headPortion === undefined ?
            0.4 : headPortion;
        console.log("portion" + headPortion);
        this.texturePath = texturePath === undefined ?
            "images/part-b/fish/fish_scales_2.png" : texturePath;
        this.initObjects();
        this.initMaterials();
        this.initShaders();
        this.resetFins();
    }

    resetFins() {
        this.leftFinRotation = [0, 0, 0];
        this.leftFinOrientation = [1, 1, 1];
        this.rightFinRotation = [0, 0, 0];
        this.rightFinOrientation = [1, 1, 1];
        this.backFinRotation = 0;
        this.backFinOrientation = 1;
        this.leftFinSpeedFactor = minSideFinSpeedFactor;
        this.rightFinSpeedFactor = minSideFinSpeedFactor;
        this.backFinSpeedFactor = minBackFinSpeedFactor;
    }

    initObjects() {
        this.body = new MySphere(this.scene, 32, 32);
        this.eye = new MySphere(this.scene, 32, 32);
        this.fin = new MyTriangle(this.scene);
    }

    initMaterials() {
        /* Body */
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyScales = new CGFtexture(this.scene, this.texturePath);
        this.bodyMaterial.setTexture(this.bodyScales);
        this.bodyMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.bodyMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.setSpecular(0, 0, 0, 0);

        /* Fin */
        this.finMaterial = new CGFappearance(this.scene);
        this.finMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.finMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.finMaterial.setShininess(10.0);
        this.finMaterial.setSpecular(0, 0, 0, 0);
        this.finMaterial.setColor(this.color[0], this.color[1], this.color[2], this.color[3]);

        /* Eye */
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeTexture = new CGFtexture(this.scene, 'images/part-b/fish/fish_eye.jpg');
        this.eyeMaterial.setTexture(this.eyeTexture);
        this.eyeMaterial.setColor(0.55, 0.18, 0.1, 1);
        this.eyeMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eyeMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.setSpecular(0, 0, 0, 0);
    }

    initShaders() {
        this.bodyShader = new CGFshader(this.scene.gl, './shaders/slimGouraud.vert', './shaders/bodyFish.frag');
        this.bodyShader.setUniformsValues({
            uSampler2: 1,
            r: this.color[0],
            g: this.color[1],
            b: this.color[2],
            headPortion: this.headPortion
        });
    }

    display() {
        /* Global scale */
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.8, 1); // global fish distortion
        this.scene.scale(0.5, 0.5, 0.5); // 0.5 units of length

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
        this.scene.rotate(this.backFinRotation, 0, 1, 0);
        this.scene.rotate(-Math.PI / 4, 1, 0, 0);
        this.scene.translate(0, 1, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Top fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(0, 1.5, -0.23);
        this.scene.scale(1, 0.61, 0.61);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Left fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(1.03, 0, 0.25);
        this.scene.scale(0.5, 0.4, 0.5);
        this.scene.rotate(this.leftFinRotation[0], 1, 0, 0);
        this.scene.rotate(this.leftFinRotation[1], 0, 1, 0);
        this.scene.rotate(this.leftFinRotation[2], 0, 0, 1);
        this.scene.rotate(Math.PI / 18, 0, 0, 1);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        /* Right fin */
        this.scene.pushMatrix();
        this.finMaterial.apply();
        this.scene.translate(-1.03, 0, 0.25);
        this.scene.scale(0.5, 0.4, 0.5);
        this.scene.rotate(this.rightFinRotation[0], 1, 0, 0);
        this.scene.rotate(-this.rightFinRotation[1], 0, 1, 0);
        this.scene.rotate(this.rightFinRotation[2], 0, 0, 1);
        this.scene.rotate(-Math.PI / 18, 0, 0, 1);
        this.fin.display();
        this.scene.defaultAppearance.apply();
        this.scene.popMatrix();

        this.scene.popMatrix(); // global scale
    }

    update() {
        /* Back fin movement */
        let backFinOffset = this.scene.speedFactor * this.backFinSpeedFactor * Math.PI / 36;
        if (Math.abs(this.backFinRotation + backFinOffset * this.backFinOrientation) > maxBackFinRotation) {
            this.backFinOrientation *= -1;
        }
        this.backFinRotation += this.backFinOrientation * backFinOffset;

        /* Left fin movement */
        let _leftFinOffset = this.scene.speedFactor * this.leftFinSpeedFactor * Math.PI / 36;
        let leftFinOffset = [_leftFinOffset, _leftFinOffset, 0];
        for (let i = 0; i < 3; i++) {
            let candidateRotation = Math.abs(this.leftFinRotation[i] + leftFinOffset[i] * this.leftFinOrientation[i]);
            if (candidateRotation > maxSideFinRotation[i] || candidateRotation < 0) {
                this.leftFinOrientation[i] *= -1;
            }
            this.leftFinRotation[i] += this.leftFinOrientation[i] * leftFinOffset[i];
        }

        /* Right fin movement */
        let _rightFinOffset = this.scene.speedFactor * this.rightFinSpeedFactor * Math.PI / 36;
        let rightFinOffset = [_rightFinOffset, _rightFinOffset, 0];
        for (let i = 0; i < 3; i++) {
            let candidateRotation = Math.abs(this.rightFinRotation[i] + rightFinOffset[i] * this.rightFinOrientation[i]);
            if (candidateRotation > maxSideFinRotation[i] || candidateRotation < 0) {
                this.rightFinOrientation[i] *= -1;
            }
            this.rightFinRotation[i] += this.rightFinOrientation[i] * rightFinOffset[i];
        }

        this.leftFinSpeedFactor = minSideFinSpeedFactor;
        this.rightFinSpeedFactor = minSideFinSpeedFactor;
    }
}