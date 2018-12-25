const fs = require("fs");
const { head } = require("./src/lib.js");
const { parse } = require("./src/parser.js");
const { headInvalidArgError } = require("./src/errors.js")
const { formatData } = require("./src/format.js");

const main = function () {
  let parsedInputs = parse(process.argv.slice(2));
  let { option, count, argError } = parsedInputs;
  if (argError) {
    return headInvalidArgError(option, count);
  }
  let headContent = head(fs, parsedInputs);
  return formatData("head", headContent);
}

console.log(main());
