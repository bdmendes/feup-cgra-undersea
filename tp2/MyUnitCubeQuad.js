import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad {
	constructor(scene) {
                this.scene = scene;
                this.quad1 = new MyQuad(scene);
                this.quad2 = new MyQuad(scene);
                this.quad3 = new MyQuad(scene);
                this.quad4 = new MyQuad(scene);
                this.quad5 = new MyQuad(scene);
                this.quad6 = new MyQuad(scene);
	}
	
	display(){

                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.quad1.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad2.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad3.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad4.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad5.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.scene.translate(0, 0, 0.5);
                this.quad6.display();
                this.scene.popMatrix();
        }
}
