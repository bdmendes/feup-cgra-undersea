import {MyAnimatedFish} from './MyAnimatedFish.js'
import {MyFish} from './MyFish.js'

export class MyAnimatedFishSet {
    constructor(scene, numberFishes){
        this.scene = scene;
        numberFishes = numberFishes === undefined ? 3 : numberFishes;
        this.initFishes(numberFishes);
    }

    initFishes(numberFishes){
        numberFishes %= 5;
        this.fishes = [];
        let counter = 0;
        while(counter < numberFishes){
            let x = Math.random() * 10 - 5;
            let z = Math.random() * 10 - 5;
            let y = Math.random() * 3 + 1;
            let r = Math.random();
            let g = (0.9 - r + 0.1) % 1;
            let b = 1 - r - g;
            let distance = Math.random() * 3;
            let circleDuration = Math.random() * 5 + 5;

            this.fishes.push(new MyAnimatedFish(this.scene,
                new MyFish(this.scene, [r,g,b,1], 0.4), [x,y,z], distance, circleDuration));
            counter++;
        }
    }

    display(){
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].display();
        }
    }

    update(){
        for (let i = 0; i < this.fishes.length; i++){
            this.fishes[i].update();
        }
    }
}