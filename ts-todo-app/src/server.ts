import app from "./app";
import { client } from "./config/mongodb";

let server;

const port = 3000;
const bootstrap = async () => {
	await client.connect();
	console.log("MongoDB Connected");
	server = app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
};

bootstrap();
