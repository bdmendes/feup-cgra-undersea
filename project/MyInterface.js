import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        this.gui.add(this.scene, 'wireframe').name('Wireframe').onChange(this.scene.onWireframeChanged.bind(this.scene));
        
        this.gui.add(this.scene, 'enableCubeMap', this.scene.enableCubeMap).name('Cube Map');

        this.gui.add(this.scene, 'selectedMapTexture', this.scene.mapTexturesIDs).name('Selected Map').onChange(this.scene.updateMapTexture.bind(this.scene));

        this.gui.add(this.scene, 'enableSandFloor').name('Sand Floor');

        this.gui.add(this.scene, 'enableFishNest').name('Fish Nest');

        this.gui.add(this.scene, 'enableWaterSurface').name('Water Surface');

        this.gui.add(this.scene, 'enableRockSet').name('Rock Set');

        this.gui.add(this.scene, 'enablePillars').name('Pillars');

        this.gui.add(this.scene, 'enableSeaWeed').name('SeaWeed');

        this.gui.add(this.scene, 'enableFish').name('Fish');

        this.gui.add(this.scene, 'scaleFactor', 0.1, 5.0).name('Scale Factor');

        this.gui.add(this.scene, 'speedFactor', -3.0, 3.0).name('Speed Factor');

        //Init keys
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] === true;
    }
}