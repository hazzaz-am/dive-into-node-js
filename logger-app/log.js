const fs = require("fs");
const path = require("path");

const inputArguments = process.argv.slice(2);
const text = inputArguments.join(" ");
const message = `${text} \n`;
const pathDir = path.join(__dirname, "log.txt");

if (!message) {
	console.log("❌ Please provide a message");
	console.log("✅ Example: node log.js Hello, I am learning node js");
	process.exit(1);
}

fs.appendFile(pathDir, message, { encoding: "utf-8" }, () => {
	console.log("append successfully");
});
