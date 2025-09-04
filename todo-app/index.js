const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todos.json");

const server = http.createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathName = url.pathname;

	if (pathName === "/todos" && req.method === "GET") {
		const todos = fs.readFileSync(filePath, { encoding: "utf-8" });

		res.writeHead(200, {
			"content-type": "application/json",
		});
		res.end(todos);
	} else if (pathName === "/todos/create-todo" && req.method === "POST") {
		let data = "";
		req.on("data", (chunk) => {
			data = data + chunk;
		});

		req.on("end", () => {
			const newTodo = JSON.parse(data);
			const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
			let updatedTodos = JSON.parse(allTodos);
			updatedTodos.push({ ...newTodo, createdAt: new Date().toLocaleString() });
			fs.writeFileSync(filePath, JSON.stringify(updatedTodos, null, 2), {
				encoding: "utf-8",
			});

			res.end(
				JSON.stringify(
					{ ...newTodo, createdAt: new Date().toLocaleString() },
					null,
					2
				)
			);
		});
	} else if (pathName === "/todo" && req.method === "GET") {
		const title = url.searchParams.get("title");
		const data = fs.readFileSync(filePath, { encoding: "utf-8" });
		const todos = JSON.parse(data);
		const todo = todos.find((todo) => todo.title === title);
		res.end(JSON.stringify(todo));
	} else if (pathName === "/todo/update-todo" && req.method === "PATCH") {
		const title = url.searchParams.get("title");
		let data = "";
		req.on("data", (chunk) => {
			data = data + chunk;
		});

		req.on("end", () => {
			const newTodo = JSON.parse(data);
			const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
			let updatedTodos = JSON.parse(allTodos);
			const indexTodo = updatedTodos.findIndex((todo) => (todo.title = title));
			updatedTodos[indexTodo] = newTodo;
			fs.writeFileSync(filePath, JSON.stringify(updatedTodos, null, 2), {
				encoding: "utf-8",
			});

			res.end(JSON.stringify({ ...newTodo }, null, 2));
		});
	} else if (pathName === "/todo" && req.method === "DELETE") {
		const title = url.searchParams.get("title");
		const data = fs.readFileSync(filePath, { encoding: "utf-8" });
		const todos = JSON.parse(data);
		const filteredTodos = todos.filter((todo) => todo.title !== title);
		fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2), {
			encoding: "utf-8",
		});
		res.end(
			JSON.stringify({
				message: "Deleted",
			})
		);
	} else {
		res.end("Route didn't match");
	}
});

server.listen(5000, () => {
	console.log("✅ server is listening on port 5000");
});


