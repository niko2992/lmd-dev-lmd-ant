import { CellType } from "./cell-type.js";

export class Cell
{
    private readonly _neighbors: Cell[];
    public get neighbors(): Cell[] { return this._neighbors; };
    
    private _type : CellType;
    public get type() : CellType {return this._type; }
    public set type(value : CellType) { this._type = value; }

    private _pheromone : number;
    public get pheromone() : number {return this._pheromone; }

    constructor(x: number, y: number)
    {
        this._type = CellType.CLEAR;
        this._pheromone = 0;
        this._neighbors = [];
    }

    addPheromone(quantity: number)
    {
        this._pheromone += quantity;
    }
}