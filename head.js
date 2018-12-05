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

const { readFileSync } = require("fs");

const { varifyInputs, getContents } = require("./src/lib.js");

const main = function() {
  let { option, count, files } = varifyInputs(process.argv.slice(2));
  console.log(getContents(readFileSync, option, count, files));
}

main();
