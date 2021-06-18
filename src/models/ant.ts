import { Cell } from "./cell.js";
import { Directions } from "./directions.js";

export class Ant
{
    private _currentCell : Cell;
    public get currentCell() : Cell {return this._currentCell; }
        
    private _lastCell : Cell;
    public get lastCell() : Cell {return this._lastCell; }    
    
    private _direction : Directions;
    public get direction() : Directions {return this._direction; }
    public set direction(value : Directions) { this._direction = value; }
        
    constructor(origin: Cell)
    {
        this._currentCell = origin;
        this._lastCell = null;
        this._direction = Directions.FOOD;
    }

    move()
    {
        
    }
}