import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, texC) {
		super(scene);
		this.initBuffers(texC);
	}
	
	initBuffers(texC) {
		this.vertices = [
            0,0,0,
            1,1,0,
            2,0,0,
            3,1,0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            1,0,2,
            3,1,2,
            2,0,1,
            2,1,3
		];

		this.normals = []
		for (let i = 0; i < 2; ++i){
			this.normals.push(0, 0, 1);
		}
		for (let i = 0; i < 2; ++i){
			this.normals.push(0, 0, -1);
		}

        if (texC != undefined){
            this.texCoords = texC;
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}