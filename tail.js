const fs = require("fs");
const { tail } = require("./src/lib.js");
const { parse } = require("./src/parser.js");
const { tailInvalidArgError } = require("./src/errors.js")

const main = function () {
  let parsedInputs = parse(process.argv.slice(2));
  let { option, count, argError } = parsedInputs;
  if (argError) {
    return tailInvalidArgError(option, count);
  }
  return tail(fs, parsedInputs);
}

console.log(main());
