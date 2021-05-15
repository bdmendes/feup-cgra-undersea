import { MyAnimatedFish } from './MyAnimatedFish.js'
import { MyFish } from './MyFish.js'

export class MyAnimatedFishSet {
    constructor(scene, numberFishes) {
        this.scene = scene;
        numberFishes = numberFishes === undefined ? 3 : numberFishes;
        this.initFishes(numberFishes);
    }

    initFishes(numberFishes) {
        numberFishes %= 5;
        this.fishes = [];
        let counter = 0;
        while (counter < numberFishes) {
            let x = Math.random() * 14 - 7;
            let z = Math.random() * 14 - 7;
            let y = Math.random() * 4 + 1;
            let r = 0.1 + Math.random() % 0.9;
            let g = 0.1 + Math.random() % 0.9;
            let b = 0.1 + Math.random() % 0.9;
            let distance = 1 + Math.random() * 3;
            let circleDuration = Math.random() * 5 + 5;
            let bodyRatio = 0.3 + Math.random() * 0.2;

            this.fishes.push(new MyAnimatedFish(this.scene,
                new MyFish(this.scene, [r, g, b, 1], bodyRatio), [x, y, z], distance, circleDuration));
            counter++;
        }
    }

    display() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].display();
        }
    }

    update() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].update();
        }
    }
}