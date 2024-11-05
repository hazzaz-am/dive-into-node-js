// console.log(__dirname);
// console.log(__filename);

// var a = 10;

// function test () {
//   console.log('hello');
// }

/**
 * this variable and functions are not save in global like window object
 */
// console.log(global.a); // undefined
// global.test(); // typeerror

const {calculate} = require("./math");

// console.log(calculate);

console.log(calculate(10, 5));
