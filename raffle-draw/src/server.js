const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use([morgan("dev"), cors(), express.json()]);

app.get("/health", (_req, res) => {
	res.status(200).json({
		message: "SUCCESS",
	});
});

app.use((_req, _res, next) => {
	const error = new Error("Resource Not Found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	if (error.status) {
		return res.status(error.status).json({
			message: error.message,
		});
	}

	res.status(500).json({
		message: "Something Went Wrong",
	});
});

app.listen(8000, () => {
	console.log("🟢 Server is listening on PORT: 8000");
});
