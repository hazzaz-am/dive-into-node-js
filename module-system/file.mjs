import fs from "node:fs";

const data = fs.readFileSync("./input.txt", "utf8");
console.log(data);

fs.writeFileSync("./input.txt", "Enjoying nodejs")

// console.log(fs.readFileSync("./input.txt", "utf-8"));