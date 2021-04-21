import { CGFobject, CGFappearance, CGFtexture } from "../../../lib/CGF.js";

export class MyPillar extends CGFobject {

    constructor(scene, slices, div, deep) {
        super(scene);
        this.slices = slices;

        if (div == undefined) this.div = 1;
        else this.div = div;

        this.height = 10;
        if (deep == undefined) this.deep = 0;
        else this.deep = deep;

        this.initBuffers();
    }

    goDeeper(ver1, ver2, ver3, levels) {
        if (levels == 0) {
            return;
        }
        levels--;

        var x_1 = this.vertices[ver1 * 3];
        var x_2 = this.vertices[ver2 * 3];
        var x_3 = this.vertices[ver3 * 3];

        var y_1 = this.vertices[ver1 * 3 + 1];
        var y_2 = this.vertices[ver2 * 3 + 1];
        var y_3 = this.vertices[ver3 * 3 + 1];

        var z_1 = this.vertices[ver1 * 3 + 2];
        var z_2 = this.vertices[ver2 * 3 + 2];
        var z_3 = this.vertices[ver3 * 3 + 2];

        var u1 = this.texCoords[ver1 * 2];
        var v1 = this.texCoords[ver1 * 2 + 1];

        var u2 = this.texCoords[ver2 * 2];
        var v2 = this.texCoords[ver2 * 2 + 1];

        var u3 = this.texCoords[ver3 * 2];
        var v3 = this.texCoords[ver3 * 2 + 1];

        var new_u = (u2 + u3) / 2;
        var new_v = (v2 + v3) / 2;

        this.texCoords.push(new_u, new_v);

        var new_ver = this.vertices.length / 3;

        var new_x = (x_2 + x_3) / 2;
        var new_y = (y_2 + y_3) / 2;
        var new_z = (z_2 + z_3) / 2;

        var vec1_x = x_3 - x_1;
        var vec1_y = y_3 - y_1;
        var vec1_z = z_3 - z_1;

        var vec2_x = x_2 - x_1;
        var vec2_y = y_2 - y_1;
        var vec2_z = z_2 - z_1;

        var normal_x = (this.normals[ver2 * 3] + this.normals[ver3 * 3]) / 2;
        var normal_y = (this.normals[ver2 * 3 + 1] + this.normals[ver3 * 3 + 1]) / 2;
        var normal_z = (this.normals[ver2 * 3 + 2] + this.normals[ver3 * 3 + 2]) / 2;

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

        if (levels == 0) {

            this.indices.push(new_ver, ver3, ver1);
            this.indices.push(new_ver, ver1, ver2);

            return;
        }

        this.goDeeper(new_ver, ver3, ver1, levels);
        this.goDeeper(new_ver, ver1, ver2, levels);

        return;

    }

    initBuffers() {

        var tex_max = this.height/5.0;

        this.vertices = [];
        this.indices = [];
        this.indicesFake = [];
        this.normals = [];
        this.texCoords = [];
        this.texCoordsFake = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var sa = Math.sin(ang);
        var ca = Math.cos(ang);

        for (var i = 0; i < this.div+1; i++){
            this.vertices.push(ca, i * this.height/(this.div), -sa);                     
            this.texCoords.push(0 * 1.0 / (this.slices + 1), tex_max - i * (tex_max/(this.div)));
            this.normals.push(ca, 0, -sa);
        }

        ang += alphaAng;

        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            sa = Math.sin(ang);
            ca = Math.cos(ang);

            for (var j = 0; j < this.div+1; j++){
                this.vertices.push(ca, j * this.height/(this.div), -sa);                     
                this.texCoords.push((i+1) * 1.0 / (this.slices + 1), tex_max - j * (tex_max/(this.div)));
                this.normals.push(ca, 0, -sa);
            }

            var div1 = this.div+1;

            for (var j = 0; j < this.div; j++){
                this.indicesFake.push(  div1 * i + 0 + j        , div1 * i + div1 + j   , div1 * i + 1 + j          );
                this.indicesFake.push(  div1 * i + div1 + j + 1 , div1 * i + 1 + j      , div1 * i + div1 + j       );
            }

            

            ang += alphaAng;
        }

        if (this.deep == 0) {
            this.indices = this.indicesFake;
        }
        else {
            for (var i = 0; i < this.slices * 6; i++) {
                this.goDeeper(this.indicesFake[i * 3], this.indicesFake[i * 3 + 1], this.indicesFake[i * 3 + 2], this.deep);
            }
        }



        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        super.display();
    }

    setFillMode() {
        //this.indices=this.indicesTris;
        this.primitiveType = this.scene.gl.TRIANGLES;
    }

    setLineMode() {
        //this.indices=this.indicesLines;
        this.primitiveType = this.scene.gl.LINES;
    };

    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        //this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
