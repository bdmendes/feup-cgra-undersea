import { CGFobject } from '../../../../lib/CGF.js';

export class MyLighterPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene, 0, 0, 0, 0);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.fakeIndices = [];
        this.normals = [];
        this.indices = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        ang += alphaAng;

        var tt = 1;

        for (var i = 1; i < this.stacks+1; i++) { tt++;} 

        for (var i = 0; i < this.stacks+1; i++){  
            this.vertices.push(0, 1.0 - 1.0/this.stacks*i, 1.0/this.stacks*i); 
            this.normals.push(0, 1.0 - 1.0/this.stacks*i, 1.0/this.stacks*i);
        }

        for (var i = 1; i < this.slices+1; i++) {

            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            for (var j = 0; j < this.stacks; j++){

                var t1_x = sa / this.stacks * (j+1);
                var t1_z = ca / this.stacks * (j+1);

                this.vertices.push(t1_x, 1.0 - 1.0/this.stacks*(j+1), t1_z); this.normals.push(t1_x, 1.0 - 1.0/this.stacks*(j+1), t1_z);

                if(j == 0){
                    this.indices.push(0, this.stacks*(i-1) + 1 ,  this.stacks*i + 1)
                }
                else{
                    this.indices.push(this.stacks*(i-1) + j ,  this.stacks*(i-1) + j + 1, this.stacks*(i) + j + 1);
                    this.indices.push(this.stacks*(i-1) + j ,  this.stacks*(i) + j + 1, this.stacks*(i) + j );
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

}