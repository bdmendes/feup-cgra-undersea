import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { keyEventCode } from "./constants.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingObject } from "./MyMovingObject.js";

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

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        // Initialize scene background
        this.cubeMap = new MyCubeMap(this);
        this.mapTexturesIDs = { 'Axis': 0, 'Plains': 1, 'City': 2, 'Beach': 3, 'Sky': 4 };

        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.pyramid = new MyPyramid(this, 6, 1);
        this.cylinder = new MyCylinder(this, 32, 6);
        this.movingObject = new MyMovingObject(this, this.pyramid, 0, 0, 0, 0);

        this.objects = [this.incompleteSphere, this.pyramid, this.movingObject, this.cylinder];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Sphere': 0, 'Pyramid': 1, 'Moving Object': 2, 'Cylinder': 3 };

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);

        // Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedObject = 2;
        this.displayNormals = false;
        this.wireframe = false;
        this.selectedMapTexture = 0;
        this.enableCubeMap = false;

        // Global object-related properties
        this.scaleFactor = 1;
        this.speedFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    onWireframeChanged(v) {
        if (v)
            this.objects[this.selectedObject].setLineMode();
        else
            this.objects[this.selectedObject].setFillMode();

    }

    updateMapTexture() {
        this.cubeMap.changeTexture(this.selectedMapTexture);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        if (this.objects[this.selectedObject] instanceof MyMovingObject) this.objects[this.selectedObject].update();
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

        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();

        // ---- BEGIN Primitive drawing section

        // Display scene background
        if (this.enableCubeMap)
            this.cubeMap.display();

        /* Unless we make MyMovingObject a proper CGFObject with all its properties... */
        if (this.objects[this.selectedObject] instanceof CGFobject) {
            if (this.displayNormals)
                this.objects[this.selectedObject].enableNormalViz();
            else
                this.objects[this.selectedObject].disableNormalViz();
        }

        // Display selected object
        this.objects[this.selectedObject].display();

        // ---- END Primitive drawing section
    }

    checkKeys() {
        let currObject = this.objects[this.selectedObject];
        if (!(currObject instanceof MyMovingObject)) return;
        if (this.gui.isKeyPressed(keyEventCode["A"])) {
            currObject.turn(this.speedFactor * Math.PI / 50);
        } if (this.gui.isKeyPressed(keyEventCode["D"])) {
            currObject.turn(-this.speedFactor * Math.PI / 50);
        } if (this.gui.isKeyPressed(keyEventCode["W"])) {
            currObject.accelerate(this.speedFactor / 200);
        } if (this.gui.isKeyPressed(keyEventCode["S"])) {
            currObject.accelerate(-this.speedFactor / 200);
        } if (this.gui.isKeyPressed(keyEventCode["R"])) {
            currObject.reset();
        }
    }
}