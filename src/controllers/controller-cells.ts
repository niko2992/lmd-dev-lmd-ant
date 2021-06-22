import { loadConfigurationFromPath } from "../../node_modules/tslint/lib/configuration.js";
import { Ant } from "../models/ant.js";
import { CellType } from "../models/cell-type.js";
import { Cell } from "../models/cell.js";
import { Notifier } from "../pattern/notifier.js";

export class ControllerCells extends Notifier
{
    private readonly _cells: Cell[][];
    public get cells(): Cell[][] { return this._cells; }

    private _cellMode : CellType;
    public get cellMode() : CellType {return this._cellMode; }
    public set cellMode(value : CellType) { this._cellMode = value; this.notify();}

    private readonly _ants: Ant[];
    public get ants(): Ant[] { return this._ants; };
    
    private timerId: NodeJS.Timeout = null;
    private antHillsLocation: number[];
    private speed: number;

    constructor()
    {
        super();

        this._cells = [];
        this._ants = [];
        this._cellMode = CellType.CLEAR;
    }

    init(gridSize: number, nbAnts: number, speed: number)
    {
        if (gridSize <= 0)
            throw('gridSize must be > 0');
        if (nbAnts <= 0)
            throw('nbAnts must be > 0');
        if (speed < 1)
            throw('speed must be > 1');

        this.initCells(gridSize);

        for (let i = 0; i < nbAnts; ++i)
            this.createAnt();

        this.speed = speed;
    }

    initCells(gridSize: number): void
    {
        this._cells.length = 0;

        for(let iRow = 0; iRow < gridSize; ++iRow)
        {
            const row = [];

            for(let iColumn = 0; iColumn < gridSize; ++iColumn)
            {
                row.push(new Cell(iColumn, iRow));
            }

            this._cells.push(row);
        }

        for(let iRow = 0; iRow < gridSize; ++iRow)
        {
            for(let iColumn = 0; iColumn < gridSize; ++iColumn)
            {
               const cell = this.cells[iRow][iColumn];

               if(iRow > 0) cell.neighbors.push(this.cells[iRow - 1][iColumn]);
               if(iRow < gridSize - 1) cell.neighbors.push(this.cells[iRow + 1][iColumn]);
               if(iColumn > 0) cell.neighbors.push(this.cells[iRow][iColumn - 1]);
               if(iColumn < gridSize - 1) cell.neighbors.push(this.cells[iRow][iColumn + 1]);
            }
        }

        // let map = [
        //     '000000000000',
        //     '00000F000000',
        //     '000001000000',
        //     '000001000000',
        //     '000001000000',
        //     '00A111000000',
        //     '000010000000',
        //     '000010000000',
        //     '000011110000',
        //     '000000010000',
        //     '000000000000',
        //     '000000000000'
        // ];

        let map = [
            '00000000000000000000',
            '00000100000100000000',
            '00000100001100000000',
            '00000100000111110000',
            '00000100000100010000',
            '00A11100000100010000',
            '00001000000100010000',
            '00001000000100010000',
            '00001111000000111000',
            '00000001100000111000',
            '00000000111111111000',
            '00000000100000001110',
            '00111000100000000010',
            '00011111100000000010',
            '00000000F00000000010',
            '00000000100000111010',
            '00000001111111101010',
            '00000001000000001010',
            '00000000000000001110',
            '00000000000000000000'
        ];

        this.loadMap(map, gridSize);

        this.notify();
    }

    loadMap(map: string[], gridSize: number) : void
    {
        if (map.length < 1)
            throw('map must be at least 1 in length');

        let sizeY = Math.min(map.length, gridSize);
        for (let iRow = 0; iRow < sizeY ; ++iRow)
        {
            let sizeX = Math.min(map[iRow].length, gridSize);
            for (let iColumn = 0; iColumn < gridSize; ++iColumn)
            {
                let curr = map[iRow][iColumn];
                if (curr == 'A')
                    this.antHillsLocation = [ iRow, iColumn ];

                this.cells[iRow][iColumn].type =
                (
                    curr == '0' ? CellType.WALL :
                    curr == '1' ? CellType.CLEAR :
                    curr == 'A' ? CellType.ANTHILL :
                    curr == 'F' ? CellType.FOOD :
                    CellType.WALL // ignore invalid and put WALL
                );
            }
        }

        // CellType.ANTHILL;
        // CellType.FOOD;
        // CellType.CLEAR;
    }

    changeCellType(cell: Cell)
    {
        cell.type = this.cellMode;
        this.notify();
    }

    createAnt()
    {
        const iRow = this.antHillsLocation[0];
        const iColumn = this.antHillsLocation[1];

        this.ants.push(new Ant(this.cells[iRow][iColumn]));
        this.notify();
    }

    start()
    {
        if (!this.timerId)
        {
            this.timerId = setInterval(() => {
                this.moveAnts();
                this.evaporatePheromones();
            }, (1000 / this.speed ));
        }
    }

    pause()
    {
        if (this.timerId)
            clearInterval(this.timerId);
            this.timerId = null;
    }

    moveAnts()
    {
        this.ants.forEach((ant) => { ant.move(); });
        this.notify();
    }

    evaporatePheromones()
    {
        this.cells.forEach((row) => {
            row.forEach((cell) => { cell.addPheromone(-0.01); });
        });
    }

    getAntQuantity(cell: Cell): number
    {
        let quantity = 0;

        this.ants.forEach((ant) => { if(ant.currentCell === cell) ++quantity; });

        return quantity;
    }
}