const getInput = function() {
  let inputs = [];
  for(let i = 2; i < process.argv.length; i++){
    inputs.push(process.argv[i]);
  }
  return inputs;
}

const varifyInputs = function(inputs) {
  let result = { firstFile : inputs[0], linesToSlice : 10 };
  return result;
}

const split= function(data, symbol) {
  return data.split(symbol);
}

module.exports = { split, getInput, varifyInputs };
