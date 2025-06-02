import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/todos", (req: Request, res: Response) => {
	res.send("Todos!");
});

app.get("/todos/create-todo", (req: Request, res: Response) => {
	res.send("Create New Todo");
});

export default app;
