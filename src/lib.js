const extractOption = function(input) {
  let option = "n";
  if(input.startsWith("-c")){
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

    if(! inputs[1].match("[a-z]"+"[0-9]") && ! inputs[1].match("[a-z]"+"[-,_]"+"[0-9]")){
      result.count = inputs[1];
      result.files = inputs.slice(2);
    }
  }
  return result;
}

const getContent = function(reader, option, count, file) {
  let splitor = "\n";
  if(option == "c"){
    splitor = "";
  }
  return reader(file, "utf8").split(splitor).slice(0,count).join(splitor);
}

const getHeadContent = function(reader, option, count, files) {
  let extractContent = getContent.bind(null, reader, option, count);
   if(files.length == 1){
     return extractContent(files[0]);
  }
  return files.map(function(file){
    let heading = "\n==> "+file+" <==\n";
    return heading + extractContent(file) } ).join("\n").slice(1);
}

module.exports = { extractOption, varifyInputs, getHeadContent };
