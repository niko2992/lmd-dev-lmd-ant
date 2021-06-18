import { CellType } from "../models/cell-type.js";
export class ViewCells {
    constructor(controllerCells) {
        this._controllerCells = controllerCells;
        this._controllerCells.addObserver(this);
        this.initMainEvents();
    }
    initMainEvents() {
        document.querySelector("cellmode.clear").addEventListener("click", () => { this._controllerCells.cellMode = CellType.CLEAR; });
        document.querySelector("cellmode.wall").addEventListener("click", () => { this._controllerCells.cellMode = CellType.WALL; });
        document.querySelector("cellmode.food").addEventListener("click", () => { this._controllerCells.cellMode = CellType.FOOD; });
        document.querySelector("cellmode.anthill").addEventListener("click", () => { this._controllerCells.cellMode = CellType.ANTHILL; });
        document.querySelector("button").addEventListener("click", () => { this._controllerCells.start(); });
    }
    notify() {
        this.displayModes();
        this.displayCells();
    }
    displayModes() {
        document.querySelectorAll("cellmode").forEach((cellmode) => { cellmode.classList.remove("active"); });
        switch (this._controllerCells.cellMode) {
            case CellType.CLEAR:
                document.querySelector("cellmode.clear").classList.add("active");
                break;
            case CellType.WALL:
                document.querySelector("cellmode.wall").classList.add("active");
                break;
            case CellType.FOOD:
                document.querySelector("cellmode.food").classList.add("active");
                break;
            case CellType.ANTHILL:
                document.querySelector("cellmode.anthill").classList.add("active");
                break;
        }
    }
    displayCells() {
        const cells = document.querySelector("cells");
        cells.innerHTML = "";
        this._controllerCells.cells.forEach((row) => {
            const rowHTML = document.createElement("row");
            row.forEach((cell) => {
                const cellHTML = document.createElement("cell");
                cellHTML.classList.add(this.getCellCSSClass(cell));
                //représentation du taux de phéromones
                cellHTML.innerHTML += `<pheromone style="opacity:${cell.pheromone}"></pheromone>`;
                //Représentation des fourmis situées sur la cellule
                const antQuantity = this._controllerCells.getAntQuantity(cell);
                for (let iAnt = 0; iAnt < antQuantity; ++iAnt)
                    cellHTML.innerHTML += "<ant></ant>";
                cellHTML.addEventListener("click", () => { this._controllerCells.changeCellType(cell); });
                rowHTML.appendChild(cellHTML);
            });
            cells.appendChild(rowHTML);
        });
    }
    getCellCSSClass(cell) {
        let cssClass = "";
        switch (cell.type) {
            case CellType.CLEAR:
                cssClass = "clear";
                break;
            case CellType.WALL:
                cssClass = "wall";
                break;
            case CellType.FOOD:
                cssClass = "food";
                break;
            case CellType.ANTHILL:
                cssClass = "anthill";
                break;
        }
        return cssClass;
    }
}
