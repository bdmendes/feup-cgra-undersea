import { CGFobject } from '../../../lib/CGF.js';
import {MySeaWeed } from "./MySeaWeed.js"

export class MySeaWeedCluster{
    constructor(scene, coords, radius, leafs){
        this.scene = scene;

        if (coords == undefined) this.coords = [0, 0, 0];
        else this.coords = coords;

        if (radius == undefined) this.radius = 1.0;
        else this.radius = radius;

        if (leafs == undefined) this.leafs = 5;
        else this.leafs = leafs;

        this.initObjects();
    }

    initObjects(){
        this.seaWeeds = [];

        for( var i = 0; i < this.leafs; i++){

            var deg = Math.random() * 361;
            var rad = deg * Math.PI / 180;

            var dist = Math.random() * (this.radius*1000) / 1000;

            var swCoord = [
                this.coords[0] + dist * Math.sin(rad),
                0,
                this.coords[2] + dist * Math.cos(rad)
            ]

            var swSize= [
                0.05 + (Math.random() * (2*100) / 1000),
                0.2 + (Math.random() * (5*100) / 1000),
                0.05 + (Math.random() * (2*100) / 1000)
            ]

            //var swSize = [0.05, 0.2, 0.05];

            var deg2 = Math.random() * 361;
            var swRot = 0;//deg2 * Math.PI / 180;

            this.seaWeeds.push(new MySeaWeed(this.scene, swCoord, swSize, swRot));

        }
    }

    update(t){
        for( var i = 0; i < this.leafs; i++){    
            this.seaWeeds[i].update(t);
        }
    }

    display(){
        for( var i = 0; i < this.leafs; i++){    
            this.seaWeeds[i].display();
        }
    }
}