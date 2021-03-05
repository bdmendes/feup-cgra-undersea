import {CGFobject} from '../lib/CGF.js';

export class MyComplexTriangle extends CGFobject {
    constructor(scene, nDivs) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        for (var i = 0; i < 2; i++){
            for (var j = 0; j <= i; j++){
                this.vertices.push(-0.5 + this.patchLength*j, 0.5 - this.patchLength*i, 0);
            }
        }

        this.indices = [
            0, 1, 2,
        ]

        this.normals = [];
        for (var i = 0; i < 3; i++){
            this.normals.push(0, 0, 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();

    }

    display() {
        this.scene.pushMatrix();
        for (var i = 0; i < this.nDivs; i++) {
            this.scene.pushMatrix();
            for(var j = 0; j < i; j++){
                super.display();

                var x = (+this.nDivs-1)*this.patchLength
                var y = (-this.nDivs+1)*this.patchLength;

                this.scene.pushMatrix();
                this.scene.translate(-x, -y, 0);
                this.scene.rotate(-Math.PI, 0, 0, 1);
                super.display();
                this.scene.popMatrix();

                this.scene.translate(this.patchLength, 0, 0);
            }
            super.display();

            this.scene.popMatrix();

            this.scene.translate(0, -this.patchLength, 0);
        }
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}

