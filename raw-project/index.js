const hello = require("./hello");
const cors = require("cors");

console.log("Hello", hello());
console.log(require.cache);
