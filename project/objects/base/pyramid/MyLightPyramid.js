import { CGFobject } from '../../../../lib/CGF.js';

export class MyLightPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene, 0, 0, 0, 0);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
        this.enableNormalViz();
    }

    initBuffers() {
        this.vertices = [];
        this.fakeIndices = [];
        this.normals = [];
        this.indices = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var tt = 3;

        for (var i = 1; i < this.stacks; i++) { tt += 2;} 

        for (var i = 0; i < this.slices; i++) {

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0, 1.0, 0); this.normals.push(ca + (caa - ca)/2, 1.0, sa + (saa - sa)/2);


            var firstTop = tt*i;

            for (var j = 1; j < this.stacks + 1; j++){

                var t1_x = sa / (this.stacks+1) * j;
                var t1_z = ca / (this.stacks+1) * j;

                var t2_x = saa / (this.stacks+1) * j;
                var t2_z = caa / (this.stacks+1) * j;

                this.vertices.push(t1_x, 1.0 - 1.0/this.stacks*(j), t1_z); this.normals.push(t1_x, 1.0, t1_z);
                this.vertices.push(t2_x, 1.0 - 1.0/this.stacks*(j), t2_z); this.normals.push(t2_x, 1.0, t2_z);

                if (j == 1){
                    this.indices.push(tt * i, tt * i + 1, tt * i + 2);
                }
                else{
                    this.indices.push( tt * i + (j-1)*2 - 1, tt * i + j * 2 - 1, tt * i + (j-1)*2 - 1 + 1);
                    this.indices.push( tt * i + j*2 - 1, tt * i + j*2 - 1 + 1, tt * i + (j-1)*2 - 1 + 1);
                }
            }

            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }

}