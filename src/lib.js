const getInput = function() {
  let inputs = [];
  for(let i = 2; i < process.argv.length; i++){
    inputs.push(process.argv[i]);
  }
  return inputs;
}

const varifyInputs = function(inputs) {
  if(inputs.length == 1){
    return { fileName : inputs[0], linesToSlice : 10 };
  }
}

const split= function(data, symbol) {
  return data.split(symbol);
}

module.exports = { split, getInput, varifyInputs };
