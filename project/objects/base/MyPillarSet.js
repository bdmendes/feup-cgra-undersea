import { MyPillarShader } from './MyPillarShader.js'

export class MyPillarSet {
    constructor(scene, numberOfPillars) {
        this.scene = scene;
        this.pillar = new MyPillarShader(this.scene);
        this.numberOfPillars = numberOfPillars == undefined ? 5 : numberOfPillars;
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

    display() {
        for (let i = 0; i < 2 * this.numberOfPillars; i++) {
            this.scene.pushMatrix();
            this.scene.translate(...this.pillarsPos[i]);
            this.scene.scale(0.5, 1, 0.5);
            this.pillar.display();
            this.scene.popMatrix();
        }
    }
}