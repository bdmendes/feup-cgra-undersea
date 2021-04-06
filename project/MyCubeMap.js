import { MyQuad } from "./MyQuad.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap {
	constructor(scene, position) {
                this.scene = scene;
                this.quad = new MyQuad(scene);

                this.size = 50;

                this.material = new CGFappearance(this.scene);
                this.material.setAmbient(0, 0, 0, 1);
                this.material.setDiffuse(0, 0, 0, 1);
                this.material.setSpecular(0, 0, 0, 1);
                this.material.setEmission(1.0, 1.0, 1.0, 1.0);
                this.material.setShininess(10.0);
                
                if (position == undefined) this.position = [0, 0, 0];
                else this.position = position;

                this.selectedTexture = 0;
                
                this.initTextures();
        }

        initTextures(){
                this.mapTextures = [
                        [new CGFtexture(this.scene, 'images/test_cubemap/px.png'), new CGFtexture(this.scene, 'images/test_cubemap/nx.png'), new CGFtexture(this.scene, 'images/test_cubemap/py.png'), new CGFtexture(this.scene, 'images/test_cubemap/ny.png'), new CGFtexture(this.scene, 'images/test_cubemap/pz.png'), new CGFtexture(this.scene, 'images/test_cubemap/nz.png')],
                        [new CGFtexture(this.scene, 'images/demo_cubemap/back.png'), new CGFtexture(this.scene, 'images/demo_cubemap/front.png'), new CGFtexture(this.scene, 'images/demo_cubemap/right.png'), new CGFtexture(this.scene, 'images/demo_cubemap/left.png'), new CGFtexture(this.scene, 'images/demo_cubemap/top.png'), new CGFtexture(this.scene, 'images/demo_cubemap/bottom.png')],
                        [new CGFtexture(this.scene, 'images/city_skybox/px.jpg'), new CGFtexture(this.scene, 'images/city_skybox/nx.jpg'), new CGFtexture(this.scene, 'images/city_skybox/py.jpg'), new CGFtexture(this.scene, 'images/city_skybox/ny.jpg'), new CGFtexture(this.scene, 'images/city_skybox/pz.jpg'), new CGFtexture(this.scene, 'images/city_skybox/nz.jpg')]
                ];
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
                this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        }

        changeTexture(selectedTexture){
                this.selectedTexture = selectedTexture;
        }

	display(){

                this.scene.pushMatrix();

                this.scene.translate(this.position[0], this.position[1], this.position[2]);
                this.scene.scale(this.size, this.size, this.size);
                
                this.scene.pushMatrix();
                this.scene.translate(0.5, 0, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0)
                this.scene.rotate(-Math.PI/2, 0, 1, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][0]);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.translate(-0.5, 0, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0)
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][1]);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 0);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][2]);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI, 0, 1, 0);
                this.scene.translate(0, -0.5, 0);
                this.scene.rotate(-Math.PI/2, 1, 0, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][3]);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0.5);
                this.scene.rotate(Math.PI/2, 0, 0, 1)
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][4]);
                this.material.apply();
                this.betterRes();
                this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                this.scene.rotate(Math.PI/2, 0, 0, 1)
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.scene.translate(0, 0, 0.5);
                this.scene.rotate(Math.PI, 1, 0, 0);
                this.material.setTexture(this.mapTextures[this.selectedTexture][5]);
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
