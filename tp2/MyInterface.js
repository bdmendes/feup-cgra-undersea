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
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Small Triangle');

        this.gui.add(this.scene, 'displayTriangleBig').name('Display Big Triangle');

        this.gui.add(this.scene, 'displayUnitCube').name('Display Unit Cube');

        this.gui.add(this.scene, 'displayQuad').name('Display Quad');

        this.gui.add(this.scene, 'displayUCQ').name('Display Unit Cube Quad');

        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');

        return true;
    }
}