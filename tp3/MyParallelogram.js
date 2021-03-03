import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0, //0
            1, 0, 0, //1
            2, 0, 0, //2
            1, 1, 0, //3
            2, 1, 0, //4
            3, 1, 0, //5

			0, 0, 0, //6
            1, 0, 0, //7
            2, 0, 0, //8
            1, 1, 0, //9
            2, 1, 0, //10
            3, 1, 0, //11
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
            1, 2, 3,
            2, 4, 3,
            2, 5, 4,

            3, 1, 0,
            3, 2, 1,
            3, 4, 2,
            4, 5, 2,
		];

		this.normals = []
		for (let i = 0; i < 6; ++i){
			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(1);
		}
		for (let i = 0; i < 6; ++i){
			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(-1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}