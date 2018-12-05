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

const { split, getInput, varifyInputs } = require("./src/lib.js");

const main = function() {
  let inputs = getInput();
  let { firstFile, linesToSlice } = varifyInputs(inputs);
  let data = readFileSync(firstFile, "utf8");
  let result = split(data, "\n").slice(0, linesToSlice);
  console.log(result.join("\n"));
}

main();
