const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todos.json");

const server = http.createServer((req, res) => {
	if (req.url === "/todos" && req.method === "GET") {
		const todos = fs.readFileSync(filePath, { encoding: "utf-8" });

		res.writeHead(200, {
			"content-type": "application/json",
		});
		res.end(todos);
	} else if (req.url === "/create-todo" && req.method === "POST") {
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
				JSON.stringify({ ...newTodo, createdAt: new Date().toLocaleString() }, null, 2)
			);
		});
	} else {
		res.end("Route didn't match");
	}
});

server.listen(5000, () => {
	console.log("✅ server is listening on port 5000");
});
