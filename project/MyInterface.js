import {CGFinterface, dat} from '../lib/CGF.js';

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

        this.gui.add(this.scene, 'displayNormals').name("Display normals");

        this.gui.add(this.scene, 'wireframe').onChange(this.scene.onWireframeChanged.bind(this.scene));

        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object');

        this.gui.add(this.scene, 'selectedMapTexture', this.scene.mapTexturesIDs).name('Selected Map');

        //Init keys
        this.initKeys();

        return true;
    }

    initKeys(){
        // create reference from the scene to the GUI
        this.scene.gui=this;

        // disable the processKeyboard function
        this.processKeyboard=function(){};

        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
    
    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }
    
    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }
    
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] === true;
    }
}