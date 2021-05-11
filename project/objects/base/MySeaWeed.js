import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFobject, CGFtexture, CGFshader } from '../../../lib/CGF.js';
import { MyPyramid } from "../base/MyPyramid.js";

export class MySeaWeed {
    constructor(scene, coords, size, rotation){
        this.scene = scene;

        if (coords == undefined) this.coords = [0, 0, 0];
        else this.coords = coords;

        if (size == undefined) this.size = [0.2, 0.5, 0.2];
        else this.size = size;

        if (rotation == undefined) this.rotation = 0;
        else this.rotation = rotation;

        this.initObject();
        this.backUpVerts()
        this.initAppearance();
    }

    initObject(){
        console.log("SeaWeed\n");
        this.pyramid = new MyPyramid(this.scene, 4, Math.ceil(this.size[1]*10.0)*3);
    }

    backUpVerts(){
        
        this.buVertices = this.pyramid.vertices.slice();
    }

    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.colorIntensity = 0.1 + (Math.random() * 10 / 10.0);
        this.appearance.setAmbient(0.1, 0.3, 0.0, 1);
        this.appearance.setDiffuse(this.colorIntensity/2, this.colorIntensity, 0.0, 1);
        this.appearance.setSpecular(0.1, 0.5, 0.0, 1);
        this.appearance.setShininess(120);

        //this.swShader = new CGFshader(this.scene.gl, 'shaders/seaWeed.vert', 'shaders/seaWeed.frag');
        //this.swShader.setUniformsValues({timeFactor: 0, colorIntensity: this.colorIntensity});
    }

    update(t){

        
        t = t / 1000 % (Math.PI * 2)

        
        for (var i = 0; i < this.buVertices.length/3; i++){

            if (this.buVertices[i*3 + 1] != 0){
                this.pyramid.vertices[i*3] = this.buVertices[i*3] + (Math.sin(this.buVertices[i*3 + 1]*2.0 + t));
            }
            
        }

        this.pyramid.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();
        this.appearance.apply();    
        //this.scene.setActiveShader(this.swShader);    
        this.scene.translate(...this.coords);
        this.scene.scale(...this.size);
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0 ,0);
        this.pyramid.display();
        this.scene.popMatrix();
        //this.scene.setActiveShader(this.scene.defaultShader);
    }
}