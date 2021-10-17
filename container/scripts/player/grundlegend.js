import { Player } from "./player.js";

export class GrundLegend extends Player{
    constructor(scene, x, y){
        super(scene, x, y, 'GrundLegend');

        this.body.setBounce(0.1);
        this.body.setOffset(11, 0);
        this.body.setSize(33, 84, false);
    }
}