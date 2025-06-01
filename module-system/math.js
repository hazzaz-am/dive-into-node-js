// third way
// exports.add = (a, b) => a + b;

const add = (a, b) => a + b;
const sub = (a, b) => a - b;

const div = (a, b) => a / b;

const calculate = (a, b) => add(a, b) - sub(a, b) / div(a, b);

// one way
// module.exports = calculate

// two way
// module.exports.add = add

// fourth way
module.exports.calculate = calculate;

// console.log(module);
