import { ControllerCells } from "../controllers/controller-cells.js";
import { ViewCells } from "../views/view-cells.js";
class AntApp {
    constructor() {
        this._controllerCells = new ControllerCells();
        this._viewCells = new ViewCells(this._controllerCells);
        this._controllerCells.initCells(10);
    }
}
window.addEventListener("load", () => { const app = new AntApp(); });
