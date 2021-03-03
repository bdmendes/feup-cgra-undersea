import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js"
import { MyTriangleBig } from "./MyTriangleBig.js"

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.greenTriangle = new MyDiamond(scene);
        this.pinkTriangle = new MyTriangle(scene);
        this.yellowParallelogram = new MyParallelogram(scene);
        this.redTriangle = new MyTriangleSmall(scene);
        this.purpleTriangle = new MyTriangleSmall(scene);
        this.orangeTriangle = new MyTriangleBig(scene);
        this.blueTriangle = new MyTriangleBig(scene);
        this.objects = [this.greenTriangle, this.pinkTriangle,
            this.yellowParallelogram, this.redTriangle,
            this.purpleTriangle, this.orangeTriangle,
            this.blueTriangle];
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
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].initBuffers();
        }
    }

    initNormalVizBuffers(){
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].initNormalVizBuffers();
        }
    }

    disableNormalViz(){
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].disableNormalViz();
        }
    }

    enableNormalViz(){
        for (var i = 0; i < this.objects.length; i++){
            this.objects[i].enableNormalViz();
        }
    }

    display() {
        let globalScale = Math.sqrt(2) / 2; // work with unit sides

        /* Center entire figure around the origin */
        this.scene.multMatrix(MyTangram.getTranslationMatrix(-2, -2, 0));

        /* Green square */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.greenTriangle.display();
        this.scene.popMatrix();

        /* Red triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 1.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.redTriangle.display();
        this.scene.popMatrix();

        /* Orange triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(1, 2, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.orangeTriangle.display();
        this.scene.popMatrix();

        /* Pink triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(2, 3, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(5 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.pinkTriangle.display();
        this.scene.popMatrix();

        /* Purple triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(3.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.purpleTriangle.display();
        this.scene.popMatrix();

        /* Yellow paralelogram */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(4, 0, 0));
        this.scene.multMatrix(MyTangram.getRotationXAxisMatrix(Math.PI));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        /* Blue Triangle */
        this.scene.pushMatrix()
        this.scene.multMatrix(MyTangram.getTranslationMatrix(3, 2, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(- Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 0));
        this.blueTriangle.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
