import express, { Request, Response } from "express";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";

export const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
	const db = await client.db("todosDB").collection("todos");
	const cursor = db.find({});
	const todos = await cursor.toArray();
	res.json(todos);
});

todosRouter.get("/:todoId", async (req: Request, res: Response) => {
	const id = req.params.todoId;
	const db = await client.db("todosDB").collection("todos");
	const filter = { _id: new ObjectId(id) };
	const todo = await db.findOne(filter);
	res.json(todo);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
	const { title, description, priority } = req.body;
	const db = await client.db("todosDB").collection("todos");
	db.insertOne({
		title,
		description,
		priority,
		isCompleted: false,
	});
	const cursor = db.find({});
	const todos = await cursor.toArray();
	res.json(todos);
});

todosRouter.put("/update-todo/:todoId", async (req: Request, res: Response) => {
	const id = req.params.todoId;
	const { title, description, priority, isCompleted } = req.body;
	const filter = { _id: new ObjectId(id) };
	const db = await client.db("todosDB").collection("todos");
	const updatedTodo = await db.updateOne(
		filter,
		{ $set: { title, description, priority, isCompleted } },
		{ upsert: true }
	);
	res.json(updatedTodo);
});

todosRouter.delete("/:todoId", async (req: Request, res: Response) => {
	const id = req.params.todoId;
	const filter = { _id: new ObjectId(id) };
	const db = await client.db("todosDB").collection("todos");
	const deleted = await db.deleteOne(filter);
	res.json(deleted);
});
