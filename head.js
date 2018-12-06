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

const { segregateInputs, head } = require("./src/lib.js");

const main = function() {
  let { option, count, files } = segregateInputs(process.argv.slice(2));
  console.log(head(readFileSync, option, count, files));
}

main();
