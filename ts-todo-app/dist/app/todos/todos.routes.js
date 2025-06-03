"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("todosDB").collection("todos");
    const cursor = db.find({});
    const todos = yield cursor.toArray();
    res.json(todos);
}));
exports.todosRouter.get("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const db = yield mongodb_1.client.db("todosDB").collection("todos");
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const todo = yield db.findOne(filter);
    res.json(todo);
}));
exports.todosRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = yield mongodb_1.client.db("todosDB").collection("todos");
    db.insertOne({
        title,
        description,
        priority,
        isCompleted: false,
    });
    const cursor = db.find({});
    const todos = yield cursor.toArray();
    res.json(todos);
}));
exports.todosRouter.put("/update-todo/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const db = yield mongodb_1.client.db("todosDB").collection("todos");
    const updatedTodo = yield db.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.json(updatedTodo);
}));
exports.todosRouter.delete("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const db = yield mongodb_1.client.db("todosDB").collection("todos");
    const deleted = yield db.deleteOne(filter);
    res.json(deleted);
}));
