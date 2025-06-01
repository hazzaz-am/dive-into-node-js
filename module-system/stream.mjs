import fs, { read } from "fs";

const readStream = fs.createReadStream("./input.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./output.txt", { encoding: "utf-8" });

readStream.on("data", (data) => {
	console.log(data);

	writeStream.write(data, (error) => {
		if (error) {
			throw Error("ERROR", error);
		}
	});
});

readStream.on("error", (error) => {
	if (error) {
		throw Error("Error", error);
	}
});

readStream.on("end", () => {
	console.log("readStream is ended");
	writeStream.end();
});

writeStream.on("finish", () => {
	console.log("Written successfully");
});
