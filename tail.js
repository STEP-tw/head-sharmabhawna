/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/

const fs = require("fs");

const { tail } = require("./src/lib.js");

const { segregateInputs } = require("./src/parsingInputLib");

const main = function() {
  let parsedInputs = segregateInputs(process.argv.slice(2));
  console.log(tail(fs, parsedInputs));
}

main();
