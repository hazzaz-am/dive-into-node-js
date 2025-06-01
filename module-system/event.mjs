import EventEmitter from "node:events";

const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
	console.log("started");
});

eventEmitter.on("sum", (arr) => {
	const total = arr.reduce((acc, curr) => acc + curr);
	console.log(total);
});

eventEmitter.emit("start");
eventEmitter.emit("sum", [1, 2, 3, 4]);
