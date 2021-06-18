export var CellType;
(function (CellType) {
    CellType[CellType["CLEAR"] = 1] = "CLEAR";
    CellType[CellType["WALL"] = 2] = "WALL";
    CellType[CellType["FOOD"] = 3] = "FOOD";
    CellType[CellType["ANTHILL"] = 4] = "ANTHILL";
})(CellType || (CellType = {}));
