const express = require("express");
const shortId = require("shortid");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs/promises");
const path = require("path");
const dbLocation = path.resolve("src", "data.json");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/:id", async (req, res) => {
	const id = req.params.id;
	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);
	const player = players.find((player) => player.id === id)

	if (!player) {
		return res.status(404).json({
			message: "Player not found"
		})
	}

	res.status(200).json(player)
});

app.post("/", async (req, res) => {
	const player = {
		...req.body,
		id: shortId.generate(),
	};
	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);
	players.push(player);
	await fs.writeFile(dbLocation, JSON.stringify(players));
	res.status(201).json(player);
});

app.get("/", async (req, res) => {
	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);
	res.status(200).json(players);
});

app.get("/health", (_req, res) => {
	res.status(200).json({
		status: "OK",
	});
});

app.listen(8000, () => {
	console.log("Server is listening on PORT: 8000");
});
