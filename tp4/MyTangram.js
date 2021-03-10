import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js"
import { MyTriangleBig } from "./MyTriangleBig.js"
import { CGFappearance, CGFtexture } from "../lib/CGF.js";

export class MyTangram{
    constructor(scene, customDiamondMaterial) {
        this.scene = scene;
        this.initPieces();
        this.initMaterials();
        if (customDiamondMaterial != undefined){
            this.customDiamondMaterial = customDiamondMaterial;
        }
        this.customizeDiamondColor = customDiamondMaterial != undefined;
    }

    initPieces() {
        this.greenSquare = new MyDiamond(this.scene, [0,0.5,0.25,0.75,0.5,0.5,0.25,0.25]);
        this.pinkTriangle = new MyTriangle(this.scene, [0.5,1,0,0.5,0,1]);
        this.yellowParallelogram = new MyParallelogram(this.scene, [1,1,0.75,1,0.5,1,0.75,0.75,0.5,0.75, 0.25,0.75,1,1,0.75,1,0.5,1,0.75,0.75,0.5,0.75, 0.25,0.75]);
        this.redTriangle = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.75, 0.75, 0.5, 0.5]);
        this.purpleTriangle = new MyTriangleSmall(this.scene, [0,0,0,0.5,0.25,0.25]);
        this.orangeTriangle = new MyTriangleBig(this.scene, [1,1,1,0,0.5,0.5]);
        this.blueTriangle = new MyTriangleBig(this.scene, [1,0,0,0,0.5,0.5]);
    }

    initMaterials() {
        // Init global tangram texture
        this.tangramTexture = new CGFtexture(this.scene, 'images/tangram.png');

        // Green Material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setTexture(this.tangramTexture);

        // Red Material
        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setTexture(this.tangramTexture);

        // Orange Material
        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setTexture(this.tangramTexture);

        // Pink Material
        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setTexture(this.tangramTexture);

        // Blue Material
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setTexture(this.tangramTexture);

        // Yellow Material
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setTexture(this.tangramTexture);

        // Purple Material
        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setTexture(this.tangramTexture);
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
        this.greenMaterial.setTexture(this.tangramTexture);
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
