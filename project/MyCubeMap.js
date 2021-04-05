import { MyQuad } from "./MyQuad.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap {
	constructor(scene, pX, nX, pY, nY, pZ, nZ) {
                this.scene = scene;
                this.quad = new MyQuad(scene);

                this.size = 4;

                this.material = new CGFappearance(this.scene);
                this.material.setAmbient(0, 0, 0, 1);
                this.material.setDiffuse(0, 0, 0, 1);
                this.material.setSpecular(0, 0, 0, 1);
                this.material.setEmission(1.0, 1.0, 1.0, 1.0);
                this.material.setShininess(10.0);
                
                if (pX == undefined) this.pX = new CGFtexture(this.scene, 'images/demo_cubemap/back.png');
                else this.pX = pX;

                if (nX == undefined) this.nX = new CGFtexture(this.scene, 'images/demo_cubemap/front.png');
                else this.nX = nX;

                if (pY == undefined) this.pY = new CGFtexture(this.scene, 'images/demo_cubemap/right.png');
                else this.pY = pY;

                if (nY == undefined) this.nY = new CGFtexture(this.scene, 'images/demo_cubemap/left.png');
                else this.nY = nY;

                if (pZ == undefined) this.pZ = new CGFtexture(this.scene, 'images/demo_cubemap/top.png');
                else this.pZ = pZ;

                if (nZ == undefined) this.nZ = new CGFtexture(this.scene, 'images/demo_cubemap/bottom.png');
                else this.nZ = nZ;
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

        betterRes(){
                this.gl = this.scene.gl;
                this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        }

	display(){

                this.scene.pushMatrix();

                this.scene.scale(this.size, this.size, this.size);

                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.scene.rotate(Math.PI/2, 0, 0, 1)
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.material.setTexture(this.pZ);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 0, 1)
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.material.setTexture(this.nZ);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.translate(0, -0.5, 0);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.material.setTexture(this.nY);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.material.setTexture(this.pY);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.translate(0.5, 0, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0)
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.material.setTexture(this.pX);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.translate(-0.5, 0, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0)
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.material.setTexture(this.nX);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();


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
