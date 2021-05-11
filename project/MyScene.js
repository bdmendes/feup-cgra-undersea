import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./objects/base/MySphere.js";
import { keyEventCode } from "./constants.js";
import { MyPyramid } from "./objects/base/MyPyramid.js";
import { MyCubeMap } from "./objects/base/MyCubeMap.js";
import { MyCylinder } from "./objects/base/MyCylinder.js";
import { MyMovingObject } from "./objects/base/MyMovingObject.js";
import { MyPillarShader } from "./objects/base/MyPillarShader.js";
import { MyRock } from "./objects/base/MyRock.js";
import { MyFish } from "./objects/scene/MyFish.js";
import { MySandFloor } from "./objects/scene/MySandFloor.js";
import { MyFishNest } from "./objects/scene/MyFishNest.js";
import { MyWaterSurface } from "./objects/base/MyWaterSurface.js";
import { MyRockSet } from "./objects/base/MyRockSet.js";
import { MySeaWeed } from "./objects/base/MySeaWeed.js";
import { MySeaWeedCluster } from "./objects/base/MySeaWeedCluster.js";
import { MySeaWeedSet } from "./objects/base/MySeaWeedSet.js";
import { MyMovingFish } from "./objects/scene/MyMovingFish.js";

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
        this.mapTexturesIDs = { 'Axis': 0, 'Plains': 1, 'City': 2, 'Beach': 3, 'Sky': 4, 'Underwater': 5 };

        //Initialize env variables
        this.nestCoords = [-7.5, -5.0];
        this.nestRadius = 2.5; //Default is 2.5

        this.initObjects();

        // Global object-related properties
        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.updateMapTexture();
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.camera.position = [2, 2, 2];
        this.camera.fov = 2.0;
        this.camera.target = [0, 2, 0];
        this.camera.direction = this.camera.calculateDirection();
    }

    initObjects() {
        // Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 32, 32, new CGFtexture(this, 'images/part-b/stone2.png'));
        this.pyramid = new MyPyramid(this, 6, 1);
        this.pillarShader = new MyPillarShader(this);
        this.rock = new MyRock(this, 0.5, 0.8, 0.2, 0, 1, 0);
        this.cylinder = new MyCylinder(this, 32, 6);
        this.fish = new MyFish(this);
        this.movingObject = new MyMovingFish(this, this.nestCoords, this.nestRadius);
        this.sandFloor = new MySandFloor(this, this.nestCoords, this.nestRadius);
        this.fishNest = new MyFishNest(this, this.nestCoords, this.nestRadius);
        this.waterSurface = new MyWaterSurface(this);
        this.seaWeed = new MySeaWeedSet(this, 3, 0.1, 1.0, this.nestCoords, this.nestRadius);
        //this.seaWeed = new MySeaWeed(this, [0, 0, 0]);
        //this.seaWeed = new MySeaWeedCluster(this, [0 ,0, 0], 1.0, 3.0);
        this.rockSet = new MyRockSet(this, 50, this.nestCoords, this.nestRadius);
        this.initPillars();

        this.objects = [this.incompleteSphere, this.pyramid, this.movingObject, this.cylinder, this.pillarShader, this.rock];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Sphere': 0, 'Pyramid': 1, 'Moving Object': 2, 'Cylinder': 3, 'Pillar': 4, 'Rock': 5 };

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
        this.displayAxis = false;
        this.selectedObject = 2;
        this.displayNormals = false;
        this.wireframe = false;
        this.selectedMapTexture = 5;
        this.enableCubeMap = true;
        this.enableSandFloor = true;
        this.enableFishNest = true;
        this.enableWaterSurface = true;
        this.enableRockSet = true;
    }
    initCameras() {
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    initPillars() {
        this.pillar = new MyPillarShader(this);
        this.numberOfPillars = 5;
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

    update(t) {
        this.checkKeys();
        this.rockSet.update();
        const selectedObject = this.objects[this.selectedObject];
        if (selectedObject instanceof MyMovingObject) {
            selectedObject.update();
            if (selectedObject.getObject() instanceof MyFish) {
                selectedObject.getObject().update();
            }
        }
        if (this.enableWaterSurface) {
            this.waterSurface.update(t);
        }
        this.seaWeed.update(t); 
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
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

        if (this.enableSandFloor)
            this.sandFloor.display();

        if (this.enableFishNest)
            this.fishNest.display();

        if (this.enableWaterSurface)
            this.waterSurface.display();

        if (this.enableRockSet)
            this.rockSet.display();

        this.seaWeed.display();

        /* Unless we make MyMovingObject a proper CGFObject with all its properties... */
        if (this.objects[this.selectedObject] instanceof CGFobject) {
            if (this.displayNormals)
                this.objects[this.selectedObject].enableNormalViz();
            else
                this.objects[this.selectedObject].disableNormalViz();
        }

        // Draw pillars
        /*
        for (let i = 0; i < 2 * this.numberOfPillars; i++) {
            this.pushMatrix();
            this.translate(...this.pillarsPos[i]);
            this.scale(0.5, 1, 0.5);
            this.pillar.display();
            this.popMatrix();
        }*/

        // Display selected object
        this.objects[this.selectedObject].display();

        // ---- END Primitive drawing section
    }

    checkKeys() {
        let currObject = this.objects[this.selectedObject];
        if (!(currObject instanceof MyMovingFish) || this.movingObject.getAnimating()) return;
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
        } if (this.gui.isKeyPressed(keyEventCode["C"])) {
            if (this.movingObject.rock == null) {
                currObject.pickUpRock(this.rockSet.pickUpRock(this.movingObject.getCoords()));
            } else {
                currObject.dropRock();
            }
        } if (this.gui.isKeyPressed(keyEventCode["Space"])) {
            currObject.verAccel(this.speedFactor / 20);
        } if (this.gui.isKeyPressed(keyEventCode["Shift"])) {
            currObject.verAccel(-this.speedFactor / 20);
        } if (!this.gui.isKeyPressed(keyEventCode["Space"]) && !this.gui.isKeyPressed(keyEventCode["Shift"])) {
            currObject.verAccel(0);
        }
    }
}