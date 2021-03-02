import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0, //0
            1, 0, 0, //1
            1, 1, 0, //2
            0, 1, 0, //3
            0, 0, 1, //4
            1, 0, 1, //5
            1, 1, 1, //6
            0, 1, 1, //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1, //base
			0, 3, 2, //base
            5, 4, 0, //side xz
            5, 0, 1, //side xz
            4, 7, 3, //side yz
            4, 3, 0, //side yz
            7, 6, 3, //side y = 1
            3, 6, 2, //side y = 1
            5, 2, 6, //side x = 1
            5, 1, 2, //side x = 1
            6, 7, 4, //top
            4, 5, 6, //top
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
