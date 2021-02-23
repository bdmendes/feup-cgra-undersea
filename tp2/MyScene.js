import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.greenTriangle = new MyDiamond(this);
    this.pinkTriangle = new MyTriangle(this);
    this.yellowParallelogram = new MyParallelogram(this);
    this.redTriangle = new MyTriangleSmall(this);
    this.purpleTriangle = new MyTriangleSmall(this);
    this.orangeTriangle = new MyTriangleBig(this);
    this.blueTriangle = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayDiamond = false;
    this.displayTriangle = false;
    this.displayParallelogram = false;
    this.displayTriangleSmall = false;
    this.displayTriangleBig = false;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    /* Green square */
    let translateMDiamond =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0.5, 0.5, 0, 1];
    let DiamondRotateAngle = Math.PI / 4;
    let rotateMDiamond =
      [Math.cos(DiamondRotateAngle), Math.sin(DiamondRotateAngle), 0, 0,
      -Math.sin(DiamondRotateAngle), Math.cos(DiamondRotateAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];
    let scaleGeneral =
      [1 / Math.sqrt(2), 0, 0, 0,
        0, 1 / Math.sqrt(2), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];

    this.pushMatrix();
    this.multMatrix(translateMDiamond);
    this.multMatrix(rotateMDiamond);
    this.multMatrix(scaleGeneral);
    if (this.displayDiamond) this.greenTriangle.display();
    this.popMatrix();

    /* Red triangle */
    let translateSTriangle =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0.5, 0.5 + 1, 0, 1];
    let rotateSTriangle1 =
      [Math.cos(-DiamondRotateAngle * 3), Math.sin(-DiamondRotateAngle * 3), 0, 0,
      -Math.sin(-DiamondRotateAngle * 3), Math.cos(-DiamondRotateAngle * 3), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];
    this.pushMatrix();
    this.multMatrix(translateSTriangle);
    this.multMatrix(rotateSTriangle1);
    this.multMatrix(scaleGeneral);
    if (this.displayTriangleSmall) this.redTriangle.display();
    this.popMatrix();

    /* Orange triangle */
    let orangeTriangleRotateAngle = Math.PI / 4;
    let rotateOrangeTriangle =
      [Math.cos(orangeTriangleRotateAngle), Math.sin(orangeTriangleRotateAngle), 0, 0,
      -Math.sin(orangeTriangleRotateAngle), Math.cos(orangeTriangleRotateAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];
    let translateOrangeTriangle =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 2, 0, 1];
    this.pushMatrix();
    this.multMatrix(translateOrangeTriangle);
    this.multMatrix(rotateOrangeTriangle);
    this.multMatrix(scaleGeneral);
    if (this.displayTriangleBig) this.orangeTriangle.display();
    this.popMatrix();

    /* Pink triangle */
    if (this.displayTriangle) this.pinkTriangle.display();

    if (this.displayParallelogram) this.yellowParallelogram.display();

    /* Purple triangle */

    let purpleTriangleRotateAngle = 3 * Math.PI / 4;
    let rotatePurpleTriangle =
      [Math.cos(purpleTriangleRotateAngle), Math.sin(purpleTriangleRotateAngle), 0, 0,
      -Math.sin(purpleTriangleRotateAngle), Math.cos(purpleTriangleRotateAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];

    let translatePurpleTriangle =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        3.5, 0.5, 0, 1];
    this.pushMatrix()

    this.multMatrix(translatePurpleTriangle);
    this.multMatrix(rotatePurpleTriangle);
    this.multMatrix(scaleGeneral);

    this.purpleTriangle.display();

    this.popMatrix();


    /* Yellow paralelogram */

    let yellowParallelogramRotateAngleZ = -3 * Math.PI / 4;
    let rotateyellowParallelogramZ =
      [Math.cos(yellowParallelogramRotateAngleZ), Math.sin(yellowParallelogramRotateAngleZ), 0, 0,
      -Math.sin(yellowParallelogramRotateAngleZ), Math.cos(yellowParallelogramRotateAngleZ), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];

    let yellowParallelogramRotateAngleX = Math.PI;
    let rotateyellowParallelogramX =
      [1, 0, 0, 0,
        0, Math.cos(yellowParallelogramRotateAngleX), Math.sin(yellowParallelogramRotateAngleX), 0,
        0, -Math.sin(yellowParallelogramRotateAngleX), Math.cos(yellowParallelogramRotateAngleX), 0,
        0, 0, 0, 1];

    let translateYellowParallelogram =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        4, 0, 0, 1];

    this.pushMatrix()

    this.multMatrix(translateYellowParallelogram);
    this.multMatrix(rotateyellowParallelogramX);
    this.multMatrix(rotateyellowParallelogramZ);
    this.multMatrix(scaleGeneral);
    this.yellowParallelogram.display();

    this.popMatrix();

    /* Blue Triangle */

    let blueTriangleRotateAngle = -Math.PI / 4;
    let rotateBlueTriangle =
      [Math.cos(blueTriangleRotateAngle), Math.sin(blueTriangleRotateAngle), 0, 0,
      -Math.sin(blueTriangleRotateAngle), Math.cos(blueTriangleRotateAngle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];

    let translateBlueTriangle =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        3, 2, 0, 1];

    this.pushMatrix()

    this.multMatrix(translateBlueTriangle);
    this.multMatrix(rotateBlueTriangle);
    this.multMatrix(scaleGeneral);
    this.blueTriangle.display();

    this.popMatrix();


    // ---- END Primitive drawing section
  }

}
