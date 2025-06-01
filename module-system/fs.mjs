import fs from "fs";

fs.readFile("./input.txt", { encoding: "utf-8" }, (error, data) => {
	if (error) {
		console.log(error.message);
		return;
	}
	console.log(data);
});

console.log('Step 4');
console.log(textData);

fs.writeFile("./input.txt", "Remove previous text", (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log("Write successful");
	}
});

fs.readFile("./input.txt", { encoding: "utf-8" }, (error, data) => {
	if (error) {
		console.error(error.message);
		return;
	}
	fs.writeFile("./output.txt", data, (error) => {
		if (error) {
			console.error(error.message);
			return;
		}
		console.log("written successfully");
	});
});
