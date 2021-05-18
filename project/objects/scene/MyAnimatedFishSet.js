import { MyAnimatedFish } from './MyAnimatedFish.js'
import { MyFish } from './MyFish.js'

export class MyAnimatedFishSet {
    constructor(scene, shader, numberFishes) {
        this.scene = scene;
        this.shader = shader;
        numberFishes = numberFishes === undefined ?
            Math.ceil(2 + (3 * Math.random())) : numberFishes;
        this.initFishes(numberFishes);
    }

    initFishes(numberFishes) {
        this.fishes = [];
        for (let counter = 0; counter < numberFishes; counter++) {
            let x = Math.random() * 14 - 7;
            let z = Math.random() * 14 - 7;
            let y = Math.random() * 4 + 1;
            let r = 0.1 + Math.random() * 0.9;
            let g = 0.1 + Math.random() * 0.9;
            let b = 0.1 + Math.random() * 0.9;
            let distance = 1 + Math.random() * 3;
            let circleDuration = Math.random() * 5 + 5;
            let headPortion = 0.3 + Math.random() * 0.2;

            this.fishes.push(new MyAnimatedFish(this.scene,
                new MyFish(this.scene, this.shader, [r, g, b, 1], headPortion),
                [x, y, z], distance, circleDuration));
        }
    }

    displayNSO() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].displayNSO();
        }
    }

    displaySO() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].displaySO();
        }
    }

    update() {
        for (let i = 0; i < this.fishes.length; i++) {
            this.fishes[i].update();
        }
    }
}