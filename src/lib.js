const getInput = function() {
  let inputs = [];
  for(let i = 2; i < process.argv.length; i++){
    inputs.push(process.argv[i]);
  }
  return inputs;
}

const extractOption = function(choice) {
  let option = "n";
  if(choice.startsWith("-c")){
    option = "c";
  }
  return option;
}

const varifyInputs = function(inputs) {
  let result = { option : "n", count : 10, files : inputs };
  result.option = extractOption(inputs[0]);
  if(inputs[0].startsWith("-")){
    result.files = inputs.slice(1);
    result.count = inputs[0][1];
    if(inputs[0].length == 3){
      result.count = inputs[0][2];
    }
    if(! inputs[1].match("[a-z]"+"[0-9]")){
      result.count = inputs[1];
      result.files = inputs.slice(2);
    }
  }
  return result;
}

const split = function(data, symbol) {
  return data.split(symbol);
}


module.exports = { split, getInput, varifyInputs };
