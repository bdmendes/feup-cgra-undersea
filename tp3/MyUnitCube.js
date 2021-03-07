import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.comp = 5;
		this.initBuffers();
	}

	///Good idea bad execution ; _ ;
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

			this.indices.push(new_ver, ver3, ver1);
			this.indices.push(new_ver, ver1, ver2);

			return;
		}

		this.goDeeper(new_ver, ver3, ver1, levels);
		this.goDeeper(new_ver, ver1, ver2, levels);

		return;

	}
	
	initBuffers() {

		this.vertices = [
			//base
			-0.5, -0.5, -0.5, //0
            0.5, -0.5, -0.5, //1
            0.5, 0.5, -0.5, //2
            -0.5, 0.5, -0.5, //3
		];

		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];

		this.indices = [];

		this.indicesFake = [
			3, 2, 0, //base
			1, 0, 2, //base
		];

		for(var i = 0; i < 2; i++){
			this.goDeeper(this.indicesFake[i*3], this.indicesFake[i*3+1], this.indicesFake[i*3+2], this.comp);
		}	

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display(){
		this.scene.pushMatrix();
		super.display();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		super.display();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		super.display();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		super.display();
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		super.display();
		this.scene.rotate(Math.PI, 1, 0, 0);
		super.display();
		this.scene.pushMatrix();
	}

	updateBuffers(complexity){
        
        // reinitialize buffers
		this.comp = Math.round(complexity*10);
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
