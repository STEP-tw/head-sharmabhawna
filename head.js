/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

const fs = require("fs");

const { head } = require("./src/lib.js");

const { segregateInputs } = require("./src/parsingInputLib.js");

const main = function() {
  let parsedInputs = segregateInputs(process.argv.slice(2));
  console.log(head(fs, parsedInputs));
}

main();
