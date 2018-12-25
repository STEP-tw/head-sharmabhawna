const fs = require("fs");
const { head } = require("./src/lib.js");
const { parse } = require("./src/parser.js");
const { headInvalidArgError } = require("./src/errors.js")

const main = function () {
  let parsedInputs = parse(process.argv.slice(2));
  let { option, count, argError } = parsedInputs;
  if (argError) {
    return headInvalidArgError(option, count);
  }
  return head(fs, parsedInputs);
}

console.log(main());
