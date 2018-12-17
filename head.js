const fs = require("fs");
const { head } = require("./src/lib.js");
const { parse } = require("./src/parser.js");

const main = function() {
  let parsedInputs = parse(process.argv.slice(2));
  console.log(head(fs, parsedInputs));
}

main();
