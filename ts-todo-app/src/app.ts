import express, { Application, Request, Response } from "express";
import path from "path";
import { todosRouter } from "./app/todos/todos.routes";

export const filePath = path.join(__dirname, "../db/todos.json");

const app: Application = express();
app.use(express.json());
app.use("/todos", todosRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

export default app;
