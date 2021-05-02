import { CGFobject } from '../../../lib/CGF.js';
import { MyRock } from "../base/MyRock.js";

export class MyRockSet {

    constructor(scene, no_rocks, nestXPos, nestYPos, nestRadius){
        this.scene = scene;
        this.no_rocks = no_rocks;

        if (nestXPos == undefined) this.nestXPos = 0.0;
        else this.nestXPos = nestXPos;

        if (nestYPos == undefined) this.nestYPos = 0.0;
        else this.nestYPos = nestYPos;

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

                if (Math.sqrt(Math.pow(x - this.nestXPos, 2) + Math.pow(z - this.nestYPos, 2)) > this.nestRadius + 1.0){
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

}