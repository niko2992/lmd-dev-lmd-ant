import { CellType } from "./cell-type.js";
export class Ant {
    _currentCell;
    get currentCell() { return this._currentCell; }
    _lastCell;
    get lastCell() { return this._lastCell; }
    path;
    _goal;
    get goal() { return this._goal; }
    set goal(value) { this._goal = value; }
    constructor(origin) {
        this._currentCell = origin;
        this._lastCell = null;
        this.path = [];
        this._goal = CellType.FOOD;
    }
    move() {
        if (this.goal === CellType.FOOD || this.path.length === 0) {
            const possibleDirections = this.getPossibleDirections();
            this.selectNextCell(possibleDirections);
        }
        else {
            this._currentCell.addPheromone(0.05);
            this._currentCell = this.path[this.path.length - 1];
            this._lastCell = null;
            this.path.splice(this.path.length - 1, 1);
        }
        this.updateGoal();
    }
    getPossibleDirections() {
        const possibleDirections = this.currentCell.neighbors.filter((cell) => {
            if (cell.type !== CellType.CLEAR && cell.type !== this.goal)
                return false;
            if (this.lastCell && this.lastCell === cell)
                return false;
            return true;
        });
        if (possibleDirections.length === 0 && this.lastCell)
            possibleDirections.push(this.lastCell);
        return possibleDirections;
    }
    selectNextCell(possibleDirections) {
        if (possibleDirections.length == 0) {
            this._lastCell = null;
        }
        else {
            let selectedDirection = null;
            const directionProbabilities = [];
            let probaMax = 0;
            possibleDirections.forEach((cell) => {
                if (cell.type === this._goal && selectedDirection === null) {
                    selectedDirection = cell;
                }
                const probaCell = 1 + (cell.pheromone * 5);
                directionProbabilities.push(probaCell);
                probaMax += probaCell;
            });
            if (selectedDirection === null) {
                const random = Math.random() * probaMax;
                let probaSum = 0;
                directionProbabilities.every((proba, index) => {
                    probaSum += proba;
                    if (probaSum > random && selectedDirection === null) {
                        selectedDirection = possibleDirections[index];
                        return false;
                    }
                    return true;
                });
            }
            this._lastCell = this.currentCell;
            this._currentCell = selectedDirection;
            if (this.goal === CellType.FOOD)
                this.path.push(this.lastCell);
            this._lastCell.addPheromone(0.05);
        }
    }
    updateGoal() {
        if (this.currentCell.type === this.goal) {
            if (this.goal == CellType.ANTHILL)
                this.goal = CellType.FOOD;
            else if (this.goal == CellType.FOOD)
                this.goal = CellType.ANTHILL;
        }
    }
}
