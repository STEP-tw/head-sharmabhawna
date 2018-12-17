const fs = require("fs");
const { tail } = require("./src/lib.js");
const { segregateInputs } = require("./src/parseInputs.js");

const main = function() {
  let parsedInputs = segregateInputs(process.argv.slice(2));
  console.log(tail(fs, parsedInputs));
}

main();
