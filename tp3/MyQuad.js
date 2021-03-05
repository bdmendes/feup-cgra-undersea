import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0, //0
            0.5, -0.5, 0,  //1
            0.5, 0.5, 0,   //2
            -0.5, 0.5, 0,  //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            0, 2, 3,
		];

		this.normals = [];
		for (let i = 0; i < 4; ++i){
			this.normals.push(0,0,1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display(){
		// this.scene.pushMatrix();
		// this.scene.rotate(Math.PI/4, 0 ,0, 1);
		// this.scene.translate(0.5, -0.5, 0);
		// super.display();
		// this.scene.popMatrix();
		super.display();
	}

	updateBuffers(complexity){


        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
