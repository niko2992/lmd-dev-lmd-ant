import { Directions } from "./directions.js";
export class Ant {
    constructor(origin) {
        this._currentCell = origin;
        this._lastCell = null;
        this._direction = Directions.FOOD;
    }
    get currentCell() { return this._currentCell; }
    get lastCell() { return this._lastCell; }
    get direction() { return this._direction; }
    set direction(value) { this._direction = value; }
    move() {
    }
}
