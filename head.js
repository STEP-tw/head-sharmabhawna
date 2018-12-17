const fs = require("fs");
const { head } = require("./src/lib.js");
const { segregateInputs } = require("./src/parseImputs.js");

const main = function() {
  let parsedInputs = segregateInputs(process.argv.slice(2));
  console.log(head(fs, parsedInputs));
}

main();
