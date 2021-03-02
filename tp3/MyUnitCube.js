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

			0, 0, 0, //8
            1, 0, 0, //9
            1, 1, 0, //10
            0, 1, 0, //11
            0, 0, 1, //12
            1, 0, 1, //13
            1, 1, 1, //14
            0, 1, 1, //15

			0, 0, 0, //16
            1, 0, 0, //17
            1, 1, 0, //18
            0, 1, 0, //19
            0, 0, 1, //20
            1, 0, 1, //21
            1, 1, 1, //22
            0, 1, 1, //23

			0.5, 0.5, 0, //24
			0.5, 0.5, 1,
			0.5, 0, 0.5,
			0.5, 1, 0.5,
			0, 0.5, 0.5,
			1, 0.5, 0.5,
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

		for (var i = 0; i < 12*3; i++){
			this.indices.push(this.indices[i] + 8);
		}

		for (var i = 0; i < 12*3; i++){
			this.indices.push(this.indices[i] + 16);
		}

		this.indices.push(0, 24, 1);
		this.indices.push(1, 24, 2);
		this.indices.push(2, 24, 3);
		this.indices.push(3, 24, 0);

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,

			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0,

			0, 0, -1,
			0, 0, 1,
			0, -1, 0,
			0, 1, 0,
			-1, 0, 0,
			1, 0, 0,
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(complexity){
        
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
