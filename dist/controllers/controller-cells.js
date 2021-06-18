import { CellType } from "../models/cell-type.js";
import { Cell } from "../models/cell.js";
import { Notifier } from "../pattern/notifier.js";
export class ControllerCells extends Notifier {
    constructor() {
        super();
        this._cells = [];
        this._cellMode = CellType.CLEAR;
    }
    get cells() { return this._cells; }
    get cellMode() { return this._cellMode; }
    set cellMode(value) { this._cellMode = value; this.notify(); }
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
        this.notify();
    }
    changeCellType(cell) {
        cell.type = this.cellMode;
        this.notify();
    }
}
