import { ControllerCells } from "../controllers/controller-cells.js";
import { ViewCells } from "../views/view-cells.js";
class AntApp {
    _controllerCells;
    _viewCells;
    constructor() {
        this._controllerCells = new ControllerCells();
        this._viewCells = new ViewCells(this._controllerCells);
        let size = 30;
        let nbAnts = 30;
        let speed = 4; // >= 1; 1 = 1s, 2 = 500ms, 3 = 333ms, etc.
        this._controllerCells.init(size, nbAnts, speed);
    }
}
window.addEventListener("load", () => { const app = new AntApp(); });
