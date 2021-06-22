import { ControllerCells } from "../controllers/controller-cells.js";
import { ViewCells } from "../views/view-cells.js";
class AntApp {
    _controllerCells;
    _viewCells;
    constructor() {
        this._controllerCells = new ControllerCells();
        this._viewCells = new ViewCells(this._controllerCells);
        this._controllerCells.initCells(30);
        for (let i = 0; i < 10; ++i)
            this._controllerCells.createAnt();
    }
}
window.addEventListener("load", () => { const app = new AntApp(); });
