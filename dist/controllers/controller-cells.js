import { Ant } from "../models/ant.js";
import { CellType } from "../models/cell-type.js";
import { Cell } from "../models/cell.js";
import { Notifier } from "../pattern/notifier.js";
export class ControllerCells extends Notifier {
    _cells;
    get cells() { return this._cells; }
    _cellMode;
    get cellMode() { return this._cellMode; }
    set cellMode(value) { this._cellMode = value; this.notify(); }
    _ants;
    get ants() { return this._ants; }
    ;
    timerId = null;
    constructor() {
        super();
        this._cells = [];
        this._ants = [];
        this._cellMode = CellType.CLEAR;
    }
    initCells(gridSize) {
        this._cells.length = 0;
        for (let iRow = 0; iRow < gridSize; ++iRow) {
            const row = [];
            for (let iColumn = 0; iColumn < gridSize; ++iColumn) {
                row.push(new Cell(iColumn, iRow));
            }
            this._cells.push(row);
        }
        for (let iRow = 0; iRow < gridSize; ++iRow) {
            for (let iColumn = 0; iColumn < gridSize; ++iColumn) {
                const cell = this.cells[iRow][iColumn];
                if (iRow > 0)
                    cell.neighbors.push(this.cells[iRow - 1][iColumn]);
                if (iRow < gridSize - 1)
                    cell.neighbors.push(this.cells[iRow + 1][iColumn]);
                if (iColumn > 0)
                    cell.neighbors.push(this.cells[iRow][iColumn - 1]);
                if (iColumn < gridSize - 1)
                    cell.neighbors.push(this.cells[iRow][iColumn + 1]);
            }
        }
        this.cells[8][2].type = CellType.ANTHILL;
        this.cells[2][8].type = CellType.FOOD;
        // Path to food
        this.cells[3][8].type = CellType.CLEAR;
        this.cells[4][8].type = CellType.CLEAR;
        this.cells[5][8].type = CellType.CLEAR;
        this.cells[6][8].type = CellType.CLEAR;
        this.cells[6][7].type = CellType.CLEAR;
        this.cells[6][6].type = CellType.CLEAR;
        this.cells[6][5].type = CellType.CLEAR;
        this.cells[6][6].type = CellType.CLEAR;
        this.cells[7][5].type = CellType.CLEAR;
        this.cells[8][5].type = CellType.CLEAR;
        this.cells[8][4].type = CellType.CLEAR;
        this.cells[8][3].type = CellType.CLEAR;
        // Round trip
        this.cells[9][4].type = CellType.CLEAR;
        this.cells[10][4].type = CellType.CLEAR;
        this.cells[11][4].type = CellType.CLEAR;
        this.cells[11][5].type = CellType.CLEAR;
        this.cells[11][6].type = CellType.CLEAR;
        this.cells[11][7].type = CellType.CLEAR;
        this.cells[10][7].type = CellType.CLEAR;
        this.cells[9][7].type = CellType.CLEAR;
        this.cells[8][7].type = CellType.CLEAR;
        this.cells[8][6].type = CellType.CLEAR;
        this.notify();
    }
    changeCellType(cell) {
        cell.type = this.cellMode;
        this.notify();
    }
    createAnt() {
        const iRow = 8;
        const iColumn = 2;
        this.ants.push(new Ant(this.cells[iRow][iColumn]));
        this.notify();
    }
    start() {
        if (!this.timerId) {
            this.timerId = setInterval(() => {
                this.moveAnts();
                this.evaporatePheromones();
            }, 500);
        }
    }
    pause() {
        if (this.timerId)
            clearInterval(this.timerId);
        this.timerId = null;
    }
    moveAnts() {
        this.ants.forEach((ant) => { ant.move(); });
        this.notify();
    }
    evaporatePheromones() {
        this.cells.forEach((row) => {
            row.forEach((cell) => { cell.addPheromone(-0.01); });
        });
    }
    getAntQuantity(cell) {
        let quantity = 0;
        this.ants.forEach((ant) => { if (ant.currentCell === cell)
            ++quantity; });
        return quantity;
    }
}
