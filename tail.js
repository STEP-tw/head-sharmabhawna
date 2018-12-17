const fs = require("fs");
const { tail } = require("./src/lib.js");
const { segregateInputs } = require("./src/parsingInputLib");

const main = function() {
  let parsedInputs = segregateInputs(process.argv.slice(2));
  console.log(tail(fs, parsedInputs));
}

main();
