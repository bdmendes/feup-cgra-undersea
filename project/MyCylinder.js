import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";

export class MyCylinder extends CGFobject {

    constructor(scene, slices, deep) {
        super(scene);
        this.slices = slices;

        this.height = 3;
        if (deep == undefined) this.deep = 0;
        else this.deep = deep;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(new CGFtexture(this.scene, 'images/test_cylinder/fade.png'));

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

        var u1 = this.texCoords[ver1*2];
        var v1 = this.texCoords[ver1*2 + 1];

        var u2 = this.texCoords[ver2*2];
        var v2 = this.texCoords[ver2*2 + 1];

        var u3 = this.texCoords[ver3*2];
        var v3 = this.texCoords[ver3*2 + 1];

        var new_u = (u2+u3)/2;
        var new_v = (v2+v3)/2;

        this.texCoords.push(new_u, new_v);

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

        var normal_x = (this.normals[ver2*3] + this.normals[ver3*3]) / 2;
		var normal_y = (this.normals[ver2*3+1] + this.normals[ver3*3+1]) / 2;
		var normal_z = (this.normals[ver2*3+2] + this.normals[ver3*3+2]) / 2;

        /*
		var normal_x = vec1_y*vec2_z - vec1_z*vec2_y;
		var normal_y = -vec1_x*vec2_z + vec1_z*vec2_x;
		var normal_z = vec1_x*vec2_y - vec1_y*vec2_x;
        
        var nn_size = Math.sqrt(Math.pow(normal_x, 2)+Math.pow(normal_y, 2)+Math.pow(normal_z, 2));
        
        normal_x /= nn_size;
        normal_y /= nn_size;
        normal_z /= nn_size;
        */

		this.vertices.push(new_x, new_y, new_z);

		this.normals.push(normal_x, normal_y, normal_z);

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

        this.vertices = [];
        this.indices = [];
        this.indicesFake = [];
        this.normals = [];
        this.texCoords = [];
        this.texCoordsFake = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 0, -sa);                 this.texCoords.push(i*1.0/(this.slices+1), 1);
            this.vertices.push(caa, 0, -saa);               this.texCoords.push((i+1)*1.0/(this.slices+1), 1);
            this.vertices.push(ca, this.height, -sa);       this.texCoords.push(i*1.0/(this.slices+1), 0);    
            this.vertices.push(caa, this.height, -saa);     this.texCoords.push((i+1)*1.0/(this.slices+1), 0);

            this.vertices.push(ca, 0, -sa);                 this.texCoords.push(i*1.0/(this.slices+1), 1);
            this.vertices.push(caa, 0, -saa);               this.texCoords.push((i+1)*1.0/(this.slices+1), 1);
            this.vertices.push(0, 0, 0);                    this.texCoords.push(0.5 ,0);

            this.vertices.push(ca, this.height, -sa);       this.texCoords.push(i*1.0/(this.slices+1), 0);
            this.vertices.push(caa, this.height, -saa);     this.texCoords.push((i+1)*1.0/(this.slices+1), 0);
            this.vertices.push(0, this.height, 0);          this.texCoords.push(0.5 ,1);

            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);
            this.normals.push(ca, 0, -sa);
            this.normals.push(caa, 0, -saa);

            for(var j = 0;j < 3; j++){
                this.normals.push(0, -1, 0);
            }
                
            for(var j = 0;j < 3; j++){
                this.normals.push(0, 1, 0);
            } 
                
            this.indicesFake.push(10*i+2, 10*i, 10*i+3);
            this.indicesFake.push(10*i+1, 10*i+3, 10*i);
            this.indicesFake.push(10*i+6, 10*i+5, 10*i+4);
            this.indicesFake.push(10*i+9, 10*i+7, 10*i+8);

            ang+=alphaAng;
        }

        if (this.deep == 0){
            this.indices = this.indicesFake;
        }
        else{
            for(var i = 0; i < this.slices*4; i++){
                this.goDeeper(this.indicesFake[i*3], this.indicesFake[i*3+1], this.indicesFake[i*3+2], this.deep);
            }
        }



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){
        this.material.apply();
        super.display();
    }

    setFillMode() { 
		//this.indices=this.indicesTris;
		this.primitiveType=this.scene.gl.TRIANGLES;
	}

	setLineMode() 
	{ 
		//this.indices=this.indicesLines;
		this.primitiveType=this.scene.gl.LINES;
	};

    updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        //this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
