import { ControllerCells } from "../controllers/controller-cells.js";
import { ViewCells } from "../views/view-cells.js";

class AntApp 
{
    private readonly _controllerCells: ControllerCells;
    private readonly _viewCells: ViewCells;

    constructor()
    {
        this._controllerCells = new ControllerCells();
        this._viewCells = new ViewCells(this._controllerCells);

        this._controllerCells.initCells(30);
        for(let i = 0; i < 10; ++i)
            this._controllerCells.createAnt();
    }
}

window.addEventListener("load", () => { const app = new AntApp(); });