let lineCountError = "head: illegal line count -- ";

let byteCountError = "head: illegal byte count -- ";

let optionError = "head: illegal option -- ";

let usageLog = "usage: head[-n lines | -c bytes][file ...]"

const extractOption = function(input) {
  let option = "n";
  if(input.startsWith("-c")){
    option = "c";
  }
  return option;
}

const segregateInputs = function(inputs) {
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

const extractContent = function(reader, option, count, file) {
  let splitor = "\n";
  if(option == "c"){
    splitor = "";
  }
  return reader(file, "utf8").split(splitor).slice(0,count).join(splitor);
}

const head = function(reader, { option, count, files }) {
  if(count == 0 || isNaN(count)){
    return option == "n" ? lineCountError + count : byteCountError + count;
  }
  let extractData = extractContent.bind(null, reader, option, count);
   if(files.length == 1){
     return extractData(files[0]);
  }
  return files.map(function(file){
    let heading = "\n==> "+file+" <==\n";
    return heading + extractData(file) } ).join("\n").slice(1);
}

module.exports = { extractOption, segregateInputs, head, extractContent };
