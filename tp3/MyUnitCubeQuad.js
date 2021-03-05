import { MyQuad } from "./MyQuad.js";
import { MyPlane } from "./MyPlane.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad {
	constructor(scene) {
                this.scene = scene;
                this.quad1 = new MyPlane(scene);
                this.quad2 = new MyPlane(scene);
                this.quad3 = new MyPlane(scene);
                this.quad4 = new MyPlane(scene);
                this.quad5 = new MyPlane(scene);
                this.quad6 = new MyPlane(scene);
                this.quads = [this.quad1, this.quad2, this.quad3, this.quad4, this.quad5, this.quad6]
	}
	
        initBuffers(){
                for (var i = 0; i < 6; i++){
                        this.quads[i].initBuffers();
                }
        }

        initNormalVizBuffers(){
                for (var i = 0; i < 6; i++){
                        this.quads[i].initNormalVizBuffers();
                }
        }

        disableNormalViz(){
                for (var i = 0; i < 6; i++){
                        this.quads[i].disableNormalViz();
                }
        }

        enableNormalViz(){
                for (var i = 0; i < 6; i++){
                        this.quads[i].enableNormalViz();
                }
        }

	display(){

                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.quads[0].display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quads[1].display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quads[2].display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quads[3].display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quads[4].display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quads[5].display();
                this.scene.popMatrix();
        }

        updateBuffers(complexity){
        
                // reinitialize buffers
                this.initBuffers();
                this.initNormalVizBuffers();
        }

}
