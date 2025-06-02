"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/todos", (req, res) => {
    res.send("Todos!");
});
app.get("/todos/create-todo", (req, res) => {
    res.send("Create New Todo");
});
exports.default = app;
