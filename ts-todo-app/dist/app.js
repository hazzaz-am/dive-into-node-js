"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filePath = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const todos_routes_1 = require("./app/todos/todos.routes");
exports.filePath = path_1.default.join(__dirname, "../db/todos.json");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.todosRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
