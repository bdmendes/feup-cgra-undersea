import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js"
import { MyTriangleBig } from "./MyTriangleBig.js"

export class MyTangram{
    constructor(scene) {
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
        // for (var i = 0; i < this.objects.length; i++){
        //     this.objects[i].initBuffers();
        // }

        this.greenTriangle.initBuffers();
        this.pinkTriangle.initBuffers();
        this.yellowParallelogram.initBuffers();
        this.redTriangle.initBuffers();
        this.purpleTriangle.initBuffers();
        this.orangeTriangle.initBuffers();
        this.blueTriangle.initBuffers();
    }

    initNormalVizBuffers(){
        // for (var i = 0; i < this.objects.length; i++){
        //     this.objects[i].initNormalVizBuffers();
        // }

        this.greenTriangle.initNormalVizBuffers();
        this.pinkTriangle.initNormalVizBuffers();
        this.yellowParallelogram.initNormalVizBuffers();
        this.redTriangle.initNormalVizBuffers();
        this.purpleTriangle.initNormalVizBuffers();
        this.orangeTriangle.initNormalVizBuffers();
        this.blueTriangle.initNormalVizBuffers();
    }

    disableNormalViz(){
        // for (var i = 0; i < this.objects.length; i++){
        //     this.objects[i].disableNormalViz();
        // }

        this.greenTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
    }

    enableNormalViz(){
        // for (var i = 0; i < this.objects.length; i++){
        //     this.objects[i].enableNormalViz();
        // }
        this.greenTriangle.enableNormalViz();
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
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.greenTriangle.display();
        this.scene.popMatrix();


        /* Red triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(0.5, 1.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.redTriangle.display();
        this.scene.popMatrix();

        /* Orange triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(1, 2, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.orangeTriangle.display();
        this.scene.popMatrix();

        /* Pink triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(2, 3, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(5 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.pinkTriangle.display();
        this.scene.popMatrix();

        /* Purple triangle */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(3.5, 0.5, 0));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.purpleTriangle.display();
        this.scene.popMatrix();

        /* Yellow paralelogram */
        this.scene.pushMatrix();
        this.scene.multMatrix(MyTangram.getTranslationMatrix(4, 0, 0));
        this.scene.multMatrix(MyTangram.getRotationXAxisMatrix(Math.PI));
        this.scene.multMatrix(MyTangram.getRotationZAxisMatrix(-3 * Math.PI / 4));
        this.scene.multMatrix(MyTangram.getScaleMatrix(globalScale, globalScale, 1));
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        /* Blue Triangle */
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
