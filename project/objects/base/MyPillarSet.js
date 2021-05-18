import { CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyPillar} from './MyPillar.js'

export class MyPillarSet {
    constructor(scene, numberOfPillars) {
        this.scene = scene;
        this.numberOfPillars = numberOfPillars == undefined ? 5 : numberOfPillars;
        this.initObjects();
        this.initAppearance();
        this.initTextures();
    }

    initObjects(){
        this.pillar = new MyPillar(this.scene, 8, 8);
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
        this.appearance.setTexture(this.pillarTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        for (let i = 0; i < 2 * this.numberOfPillars; i++) {
            this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.translate(...this.pillarsPos[i]);
            this.scene.scale(0.5, 1, 0.5);
            this.pillar.display();
            this.scene.popMatrix();
        }
    }
}