import { CellType } from "./cell-type.js";
export class Cell {
    constructor(x, y) {
        this._type = CellType.WALL;
        this._pheromone = 0;
        this._neighbors = [];
    }
    get neighbors() { return this._neighbors; }
    ;
    get type() { return this._type; }
    set type(value) { this._type = value; }
    get pheromone() { return this._pheromone; }
    addPheromone(quantity) {
        this._pheromone += quantity;
        if (this._pheromone > 1)
            this._pheromone = 1;
        else if (this._pheromone < 0)
            this._pheromone = 0;
    }
}
