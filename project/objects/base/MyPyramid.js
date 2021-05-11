import { CGFobject } from '../../../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene, 0, 0, 0, 0);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        //this.enableNormalViz();
        //this.normalizePosition();
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

        /*var u1 = this.texCoords[ver1 * 2];
        var v1 = this.texCoords[ver1 * 2 + 1];

        var u2 = this.texCoords[ver2 * 2];
        var v2 = this.texCoords[ver2 * 2 + 1];

        var u3 = this.texCoords[ver3 * 2];
        var v3 = this.texCoords[ver3 * 2 + 1];

        var new_u = (u2 + u3) / 2;
        var new_v = (v2 + v3) / 2;

        this.texCoords.push(new_u, new_v);*/

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
        this.vertices = [];
        this.fakeIndices = [];
        this.normals = [];
        this.indices = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var tt = 3;

        for (var i = 1; i < this.stacks; i++) { tt += 2 + i;} 

        for (var i = 0; i < this.slices; i++) {
      
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            var ac = 0;

            for (var j = 0; j < this.stacks + 1; j++){

                var nsa = sa / (this.stacks) * j;
                var nsaa = saa / (this.stacks) * j;
                var nca = ca / (this.stacks) * j;
                var ncaa = caa / (this.stacks) * j;

                for (var k = 0; k < j + 1; k++){

                    var tx;
                    var tz;

                    if (j == 0){
                        tx = 0;
                        tz = 0;
                    } else{
                        tx = (nca + (ncaa - nca)/j * k);
                        tz = -(nsa + (nsaa - nsa)/j * k);
                    }
                    
                    ac++;

                    this.vertices.push( tx, 1.0 - (j * 1.0/this.stacks) , tz ); this.normals.push(tx, 1.0, tz);

                }

                var firstTop = tt*i;
                var firstBot = tt*i;

                if (j == 0) continue;

                for (var k = 0; k < j + 1; k++){ firstBot += k; }
                for (var k = 0; k < j; k++){ firstTop += k; }

                for (var k = 0; k < j; k++){
                    this.indices.push(firstTop + k, firstBot + k, firstBot + k + 1);
                }

                for (var k = 0; k < j-1; k++){
                    this.indices.push(firstTop + k + 1, firstTop + k, firstBot + k + 1);
                }


            }

            

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5, 0);
        this.scene.scale(0.3, 0.3, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        super.display();
        this.scene.popMatrix();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


