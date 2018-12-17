const fs = require("fs");
const { tail } = require("./src/lib.js");
const { parse } = require("./src/parseInputs.js");

const main = function() {
  let parsedInputs = parse(process.argv.slice(2));
  console.log(tail(fs, parsedInputs));
}

main();
