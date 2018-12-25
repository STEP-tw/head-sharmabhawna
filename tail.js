const fs = require("fs");
const { tail } = require("./src/lib.js");
const { parse } = require("./src/parser.js");
const { tailInvalidArgError } = require("./src/errors.js")
const { formatData } = require("./src/format.js")

const main = function () {
  let parsedInputs = parse(process.argv.slice(2));
  let { option, count, argError } = parsedInputs;
  if (argError) {
    return tailInvalidArgError(option, count);
  }
  let tailContent = tail(fs, parsedInputs);
  return formatData("tail", tailContent);
}

console.log(main());
