import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad {
	constructor(scene) {
                this.scene = scene;
                this.quad = new MyQuad(scene);
	}
	
        initBuffers(){
                this.quad.initBuffers();
        }

        initNormalVizBuffers(){
                this.quad.initNormalVizBuffers();
        }

        disableNormalViz(){
                this.quad.disableNormalViz();
        }

        enableNormalViz(){
                this.quad.enableNormalViz();
        }

	display(){
                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad.display();
                this.scene.popMatrix();
        }

        updateBuffers(){
        
                // reinitialize buffers
                this.quad.updateBuffers();
                this.initBuffers();
                this.initNormalVizBuffers();
                this.updateTexCoordsGLBuffers();
        }

}
