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
    result.count = inputs[0].slice(1, inputs[0].length);
    if(inputs[0].length >= 3 && inputs[0].match("[a-z]")){
      result.count = inputs[0].slice(2, inputs[0].length);
    }
    if(! inputs[1].match("[a-z]"+"[0-9]")){
      result.count = inputs[1];
      result.files = inputs.slice(2);
    }
  }
  return result;
}

const getContents = function(reader, option, count, files) {
  let splitor = "\n";
  if(option == "c"){
    splitor = "";
  }
  if(files.length == 1){
    return reader(files[0], "utf8").split(splitor).slice(0,count).join(splitor);
  }
  return files.map(function(file){
    let heading = "\n==> "+file+" <==\n";
    return heading + reader(file, "utf8").split(splitor).slice(0,count).join(splitor) } ).join("\n").slice(1);
}

module.exports = { varifyInputs, getContents };
