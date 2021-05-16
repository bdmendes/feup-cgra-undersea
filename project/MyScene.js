import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { keyEventCode } from "./constants.js";
import { MyCubeMap } from "./objects/base/MyCubeMap.js";
import { MySandFloor } from "./objects/scene/MySandFloor.js";
import { MyFishNest } from "./objects/scene/MyFishNest.js";
import { MyWaterSurface } from "./objects/base/MyWaterSurface.js";
import { MyRockSet } from "./objects/base/MyRockSet.js";
import { MySeaWeedSet } from "./objects/base/MySeaWeedSet.js";
import { MyMovingFish } from "./objects/scene/MyMovingFish.js";
import { MyAnimatedFishSet } from "./objects/scene/MyAnimatedFishSet.js";
import { MyPillarSet } from "./objects/base/MyPillarSet.js";
import { MyFish } from "./objects/scene/MyFish.js"

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

        //Nest properties
        this.nestCoords = [-7.5, -5.0];
        this.nestRadius = 2.5; //Default is 2.5

        //Sea Weed properties
        this.seaWeedClusterSize = 3;
        this.seaWeedMinRadius = 0.1;
        this.seaWeedMaxRadius = 1.0;

        //Rock Set properties;
        this.rockSetSize = 10.0;

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
        this.fish = new MyMovingFish(this, new MyFish(this), this.nestCoords, this.nestRadius);
        this.sandFloor = new MySandFloor(this, this.nestCoords, this.nestRadius);
        this.fishNest = new MyFishNest(this, this.nestCoords, this.nestRadius);
        this.waterSurface = new MyWaterSurface(this);
        this.seaWeed = new MySeaWeedSet(this, this.seaWeedClusterSize, this.seaWeedMinRadius, this.seaWeedMaxRadius, this.nestCoords, this.nestRadius);
        this.rockSet = new MyRockSet(this, this.rockSetSize, this.nestCoords, this.nestRadius);
        this.AIFish = new MyAnimatedFishSet(this);
        this.pillars = new MyPillarSet(this, 5);

        // Materials
        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);

        // Objects connected to MyInterface
        this.displayAxis = false;
        this.selectedMapTexture = 5;
        this.enableCubeMap = true;
        this.enableSandFloor = true;
        this.enableFishNest = true;
        this.enableWaterSurface = true;
        this.enableRockSet = true;
        this.enablePillars = true;
        this.enableSeaWeed = true;
        this.enableFish = true;
        this.enableAIFish = true;
    }

    initCameras() {
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    updateMapTexture() {
        this.cubeMap.changeTexture(this.selectedMapTexture);
    }

    update(t) {
        this.checkKeys();
        if (this.enableRockSet)
            this.rockSet.update();
        if (this.enableAIFish)
            this.AIFish.update();
        if (this.enableFish)
            this.fish.update();
        if (this.enableRockSet)
            this.rockSet.update();
        if (this.enableFish)
            this.fish.update(t);
        if (this.enableWaterSurface)
            this.waterSurface.update(t);
        if (this.enableSeaWeed)
            this.seaWeed.update(t);
    }

    display() {
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Apply default material
        this.defaultAppearance.apply();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        if (this.displayAxis)
            this.axis.display();
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
        if (this.enableSeaWeed)
            this.seaWeed.display();
        if (this.enableFish)
            this.fish.display();
        if (this.enableAIFish)
            this.AIFish.display();
        if (this.enablePillars)
            this.pillars.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }

    checkKeys() {
        if (this.gui.isKeyPressed(keyEventCode["A"])) {
            this.fish.turn(this.speedFactor * Math.PI / 50);
        }
        if (this.gui.isKeyPressed(keyEventCode["D"])) {
            this.fish.turn(-this.speedFactor * Math.PI / 50);
        }
        if (this.gui.isKeyPressed(keyEventCode["W"])) {
            this.fish.accelerate(this.speedFactor / 200);
        }
        if (this.gui.isKeyPressed(keyEventCode["S"])) {
            this.fish.accelerate(-this.speedFactor / 200);
        }
        if (this.gui.isKeyPressed(keyEventCode["R"])) {
            this.fish.reset();
        }
        if (this.gui.isKeyPressed(keyEventCode["C"])) {
            if (this.fish.rock == null) {
                this.fish.pickUpRock(this.rockSet.
                    pickUpRock(this.fish.getCoords()));
            } else {
                this.fish.dropRock();
            }
        }

        if (this.gui.isKeyPressed(keyEventCode["P"])) {
            this.fish.setVerticalSpeed(this.speedFactor / 50);
        } else if (this.gui.isKeyPressed(keyEventCode["L"])) {
            this.fish.setVerticalSpeed(-this.speedFactor / 50);
        } else {
            this.fish.setVerticalSpeed(0);
        }
    }
}