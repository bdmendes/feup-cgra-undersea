import { CGFappearance, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPillar} from './MyPillar.js'

export class MyPillarSet {
    constructor(scene, numberOfPillars) {
        this.scene = scene;
        this.numberOfPillars = numberOfPillars == undefined ? 5 : numberOfPillars;
        this.initObjects();
        this.initAppearance();
        this.initTextures();
        this.initShaders();
    }

    initObjects(){
        this.pillar = new MyPillar(this.scene, 64, 64);
        this.pillarsPos = [];
        let _flPillarPos = [2.5, 0, -3.5];
        let _frPillarPos = [2.5, 0, 0];
        for (let i = 0; i < this.numberOfPillars; i++) {
            // left pillar
            this.pillarsPos.push([..._flPillarPos]);
            this.pillarsPos[this.pillarsPos.length - 1][0] += i * 5;

            // right pillar
            this.pillarsPos.push([..._frPillarPos]);
            this.pillarsPos[this.pillarsPos.length - 1][0] += i * 5;
        }
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(120);
    }

    initTextures(){
        this.pillarTexture = new CGFtexture(this.scene, 'images/part-b/pillarTexture4.png');
        this.bumpMap = new CGFtexture(this.scene, 'images/part-b/pillarMap.png');
        this.appearance.setTexture(this.pillarTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initShaders() {
        this.pillarShader = new CGFshader(this.scene.gl, 'shaders/pillarShader.vert', 'shaders/pillarShader.frag');
        this.pillarShader.setUniformsValues({ uSampler1: 1, uSampler2: 2});
    }

    display() {

        this.scene.pushMatrix();

        this.pillarTexture.bind(1);
        this.bumpMap.bind(2);

        this.appearance.apply();

        this.scene.setActiveShader(this.pillarShader);

        for (let i = 0; i < 2 * this.numberOfPillars; i++) {
            this.scene.pushMatrix();
            this.scene.translate(...this.pillarsPos[i]);
            this.scene.scale(0.5, 1, 0.5);
            this.pillar.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}