import { CGFobject } from '../../../../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet {

    constructor(scene, no_rocks, nestCoords, nestRadius){
        this.scene = scene;
        this.no_rocks = no_rocks;

        if (nestCoords == undefined) this.nestCoords = [0, 0];
        else this.nestCoords = nestCoords;

        if (nestRadius == undefined) this.nestRadius = 2.5;
        else this.nestRadius = nestRadius;

        this.initRocks();
    }

    initRocks(){
        this.rocks = [];

        for (var i = 0; i < this.no_rocks; i++){

            var height = (Math.random() * 31 + 30)/100;
            var width = (Math.random() * 71 + 30)/100;
            var lenght = (Math.random() * 71 + 30)/100;

            var x = 0.0;
            var y = 0.05;
            var z = 0.0;


            while (true){
                x = Math.random() * 50 - 25;
                z = Math.random() * 50 - 25;

                if (Math.sqrt(Math.pow(x - this.nestCoords[0], 2) + Math.pow(z - this.nestCoords[1], 2)) > this.nestRadius + 1.0){
                    break;
                }
            }

            this.rocks.push(new MyRock(this.scene, width, lenght, height, x, y, z));
        } 
    }

    display(){
        for(var i = 0; i < this.no_rocks; i++){
            this.rocks[i].display();
        }
    }

    getDist(c1, c2){
        return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2))
    }

    update(){
        for (var i = 0; i < this.rocks.length; i++){
            this.rocks[i].update();
        }
    }

    pickUpRock(coords){

        var MAX_DIST = 10.0;
        
        var min_dist = 50.0;
        var rock = null;

        for (var i = 0; i < this.rocks.length; i++){
            var cur_dist = this.getDist(coords, this.rocks[i].getCoords());
            var dist_to_nest = this.getDist([this.nestCoords[0], 0.05, this.nestCoords[1]], this.rocks[i].getCoords());
            if ( cur_dist < min_dist && dist_to_nest >= this.nestRadius){
                min_dist = cur_dist;
                rock = this.rocks[i];
            }
        }

        if (min_dist <= MAX_DIST){
            return rock;
        }
        else{
            return null;
        }

    }

}