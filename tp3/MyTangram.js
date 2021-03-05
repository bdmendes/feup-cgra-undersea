import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js"
import { MyTriangleBig } from "./MyTriangleBig.js"
import { CGFappearance } from "../lib/CGF.js";

export class MyTangram{
    constructor(scene) {
        this.scene = scene;
        this.initPieces();
        this.initMaterials();
    }

    initPieces() {
        this.greenSquare = new MyDiamond(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.yellowParallelogram = new MyParallelogram(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
    }

    initMaterials() {
        // Green Material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0, 1, 0, 1.0);
        this.greenMaterial.setDiffuse(0, 1, 0, 1.0);
        this.greenMaterial.setSpecular(0, 0, 0, 1.0);
        this.greenMaterial.setShininess(10.0);

        // Red Material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1, 0.1, 0.1, 1.0);
        this.redMaterial.setDiffuse(1, 0.1, 0.1, 1.0);
        this.redMaterial.setSpecular(0, 0, 0, 1.0);
        this.redMaterial.setShininess(10.0);

        // Orange Material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(1, 0.6, 0, 1.0);
        this.orangeMaterial.setDiffuse(1, 0.6, 0, 1.0);
        this.orangeMaterial.setSpecular(0, 0, 0, 1.0);
        this.orangeMaterial.setShininess(10.0);

        // Pink Material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(1, 0.6, 0.8, 1.0);
        this.pinkMaterial.setDiffuse(1, 0.6, 0.8, 1.0);
        this.pinkMaterial.setSpecular(0, 0, 0, 1.0);
        this.pinkMaterial.setShininess(10.0);

        // Blue Material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0.6, 1, 1.0);
        this.blueMaterial.setDiffuse(0, 0.6, 1, 1.0);
        this.blueMaterial.setSpecular(0, 0, 0, 1.0);
        this.blueMaterial.setShininess(10.0);

        // Yellow Material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(1, 1, 0, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 0, 1.0);
        this.yellowMaterial.setSpecular(0, 0, 0, 1.0);
        this.yellowMaterial.setShininess(10.0);

        // Purple Material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.6, 0.3, 0.75, 1.0);
        this.purpleMaterial.setDiffuse(0.6, 0.3, 0.75, 1.0);
        this.purpleMaterial.setSpecular(0, 0, 0, 1.0);
        this.purpleMaterial.setShininess(10.0);
    }

    static getTranslationMatrix(Tx, Ty, Tz) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            Tx, Ty, Tz, 1];
    }

    static getRotationZAxisMatrix(angle) {
        return [Math.cos(angle), Math.sin(angle), 0, 0,
        -Math.sin(angle), Math.cos(angle), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1];
    }

    static getRotationXAxisMatrix(angle) {
        return [1, 0, 0, 0,
            0, Math.cos(angle), Math.sin(angle), 0,
            0, -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 0, 1];
    }

    static getScaleMatrix(Sx, Sy, Sz) {
        return [Sx, 0, 0, 0,
            0, Sy, 0, 0,
            0, 0, Sz, 0,
            0, 0, 0, 1];
    }

    initBuffers(){
        this.greenSquare.initBuffers();
        this.pinkTriangle.initBuffers();
        this.yellowParallelogram.initBuffers();
        this.redTriangle.initBuffers();
        this.purpleTriangle.initBuffers();
        this.orangeTriangle.initBuffers();
        this.blueTriangle.initBuffers();
    }

    initNormalVizBuffers(){
        this.greenSquare.initNormalVizBuffers();
        this.pinkTriangle.initNormalVizBuffers();
        this.yellowParallelogram.initNormalVizBuffers();
        this.redTriangle.initNormalVizBuffers();
        this.purpleTriangle.initNormalVizBuffers();
        this.orangeTriangle.initNormalVizBuffers();
        this.blueTriangle.initNormalVizBuffers();
    }

    disableNormalViz(){
        this.greenSquare.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
    }

    enableNormalViz(){
        this.greenSquare.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.blueTriangle.enableNormalViz();
    }

    display() {
        let globalScale = Math.sqrt(2) / 2; // work with unit sides

        this.scene.pushMatrix();

        /* Center entire figure around the origin */
        this.scene.multMatrix(MyTangram.getTranslationMatrix(-2, -2, 0));

        /* Green square */
        this.greenMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.greenSquare.display();
        this.scene.popMatrix();

        /* Red triangle */
        this.redMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 1.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.redTriangle.display();
        this.scene.popMatrix();

        /* Orange triangle */
        this.orangeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(1, 2, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.orangeTriangle.display();
        this.scene.popMatrix();

        /* Pink triangle */
        this.pinkMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(2, 3, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(5 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.pinkTriangle.display();
        this.scene.popMatrix();

        /* Purple triangle */
        this.purpleMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(3.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.purpleTriangle.display();
        this.scene.popMatrix();

        /* Yellow paralelogram */
        this.yellowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(4, 0, 0));
        this.scene.multMatrix(MyTangram.getRotationXAxisMatrix(Math.PI));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        /* Blue Triangle */
        this.blueMaterial.apply();
        this.scene.pushMatrix()
        this.scene.multMatrix(MyTangram.getTranslationMatrix(3, 2, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(- Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.blueTriangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
