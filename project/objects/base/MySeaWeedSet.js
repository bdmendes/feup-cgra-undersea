import { CGFobject } from '../../../lib/CGF.js';
import {MySeaWeedCluster } from "../base/MySeaWeedCluster.js"

export class MySeaWeedSet{

    constructor(scene, no_clusters, minRadius, maxRadius, nestCoords, nestRadius){
        this.scene = scene;

        if (no_clusters == undefined) this.no_clusters = 10.0;
        else this.no_clusters = no_clusters;

        if (minRadius == undefined) this.minRadius = 0.1;
        else this.minRadius = minRadius;

        if (maxRadius == undefined) this.maxRadius = 1.0;
        else this.maxRadius = maxRadius;

        if (nestCoords == undefined) this.nestCoords = [0, 0];
        else this.nestCoords = nestCoords;

        if (nestRadius == undefined) this.nestRadius = 2.5;
        else this.nestRadius = nestRadius;
        
        this.initObjects();

    }

    initObjects(){
        this.clusters = [];

        for (var i = 0; i < this.no_clusters; i++){

            var swCoords;

            while (true){

                swCoords = [
                    Math.random() * ((49 - this.maxRadius * 2) * 100) / 100 - (24 - this.maxRadius),
                    0,
                    Math.random() * ((49 - this.maxRadius * 2) * 100) / 100 - (24 - this.maxRadius)
                ];

                if (Math.sqrt(Math.pow(swCoords[0] -  this.nestCoords[0], 2) + Math.pow(swCoords[2] -  this.nestCoords[1], 2)) > this.nestRadius + this.maxRadius +1.0){
                    break;
                }
            }   

            var radius = Math.random() * ((this.maxRadius - this.minRadius) * 100) / 100 + this.minRadius;

            var leafs = Math.pow(Math.round(radius*10), 2)/2;

            this.clusters.push(new MySeaWeedCluster(this.scene, swCoords, radius, leafs));
        }

    }

    update(t){
        for( var i = 0; i < this.no_clusters; i++){    
            this.clusters[i].update(t);
        }
    }

    display(){
        for (var i = 0; i < this.no_clusters; i++){

            this.clusters[i].display();

        }
    }

}