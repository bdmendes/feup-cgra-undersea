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

	goDeeper(ver1, ver2, ver3, levels){
		if (levels == 0){
			return;
		}
		levels--;

		var x_1 = this.vertices[ver1*3];
		var x_2 = this.vertices[ver2*3];
		var x_3 = this.vertices[ver3*3];

		var y_1 = this.vertices[ver1*3 + 1];
		var y_2 = this.vertices[ver2*3 + 1];
		var y_3 = this.vertices[ver3*3 + 1];

		var z_1 = this.vertices[ver1*3 + 2];
		var z_2 = this.vertices[ver2*3 + 2];
		var z_3 = this.vertices[ver3*3 + 2];

		var new_ver = this.vertices.length/3;

		var new_x = (x_2 + x_3)/2;
		var new_y = (y_2 + y_3)/2;
		var new_z = (z_2 + z_3)/2;

		var vec1_x = x_3 - x_1;
		var vec1_y = y_3 - y_1;
		var vec1_z = z_3 - z_1;

		var vec2_x = x_2 - x_1;
		var vec2_y = y_2 - y_1;
		var vec2_z = z_2 - z_1;

		var normal_x = vec1_y*vec2_z - vec1_z*vec2_y;
		var normal_y = -vec1_x*vec2_z + vec1_z*vec2_x;
		var normal_z = vec1_x*vec2_y - vec1_y*vec2_x;	

		
		if(normal_x>0) normal_x = 1;
		if(normal_x<0) normal_x = -1;
		if(normal_y>0) normal_y = 1;
		if(normal_y<0) normal_y = -1;
		if(normal_z>0) normal_z = 1;
		if(normal_z<0) normal_z = -1;

		this.vertices.push(new_x, new_y, new_z);

		this.normals.push(-normal_x, -normal_y, -normal_z);

		if (levels == 0){

			this.indices.push(ver1, new_ver, ver3);
			this.indices.push(ver1, ver2, new_ver);

			return;
		}

		this.goDeeper(ver1, new_ver, ver3, levels);
		this.goDeeper(ver1, ver2, new_ver, levels);

		return;

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
		];

		//Counter-clockwise reference of vertices

		this.indices = [];

		this.indicesFake = [
			3, 2, 0, //base
			1, 0, 2, //base
            4, 0, 5, //side xz
            1, 5, 0, //side xz
            4, 7, 3, //side yz
            4, 3, 0, //side yz
            7, 6, 3, //side y = 1
            3, 6, 2, //side y = 1
            5, 2, 6, //side x = 1
            5, 1, 2, //side x = 1
            6, 7, 4, //top
            4, 5, 6, //top
		];

		/*
		for (var i = 0; i < 12*3; i++){
			this.indices.push(this.indices[i] + 8);
		}

		for (var i = 0; i < 12*3; i++){
			this.indices.push(this.indices[i] + 16);
		}*/

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
		]

		for(var i = 0; i < 4; i++){
			this.goDeeper(this.indicesFake[i*3], this.indicesFake[i*3+1], this.indicesFake[i*3+2], 1);
		}
		

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
