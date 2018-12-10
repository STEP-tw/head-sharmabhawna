let lineCountError = "head: illegal line count -- ";

let byteCountError = "head: illegal byte count -- ";

let offsetError = "tail: illegal offset -- ";

const extractOption = function(input) {
  if (input.startsWith("-c")) {
    return "c";
  }
  return "n";
};

const segregateInputs = function(inputs) {
  let result = { option: "n", count: 10, files: inputs };
  result.option = extractOption(inputs[0]);

  if (! inputs[0].startsWith("-")) {
    return result;
  }
  result.files = inputs.slice(1);
  result.count = inputs[0].slice(2);

  if (! isNaN(inputs[0][1])) {
    result.count = inputs[0].slice(1);
  }

  if (! isNaN(inputs[1])) {
    result.count = inputs[1];
    result.files = inputs.slice(2);
  }
  return result;
};

const extractSeperator = function(option) {
  if(option == "c"){
    return "";
  }
  return "\n";
}

const extractHeadContent = function(fs, option, count, file) {
  let { existsSync } = fs;
  let seperator = extractSeperator(option);
  if (!existsSync(file)) {
    return "head: " + file + ": No such file or directory";
  }
  return extractContent(fs, file).split(seperator).slice(0, count).join(seperator);
}

const extractTailContent = function(fs, option, count, file) {
  let { existsSync } = fs;
  let seperator = extractSeperator(option);
  if (!existsSync(file)) {
    return "tail: " + file + ": No such file or directory";
  }
  let content = extractContent(fs, file);
  let contents = content.split(seperator);
  let totalLength = contents.length;
  let requiredCount = totalLength-count;
  if(count >= totalLength){
    requiredCount = totalLength;
  }
  return contents.slice(requiredCount).join(seperator);
}

const extractContent = function(fs, file) {
  let { readFileSync } = fs;
  return readFileSync(file, "utf8");
};

const isInvalidCount = function(count) {
  return count == 0 || isNaN(count);
}

const head = function(fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isInvalidCount(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count;
  }
  let extractData = extractHeadContent.bind(null, fs, option, count);
  if (files.length == 1) {
    return extractData(files[0]);
  }
  return files
    .map(function(file) {
      if(! existsSync(file)){
        return "\n"+extractData(file);
      }
      let header = "\n==> " + file + " <==\n";
      return header + extractData(file);
    })
    .join("\n")
    .slice(1);
};

const tail = function(fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isNaN(count)) {
    return offsetError + count;
  }
  let extractData = extractTailContent.bind(null, fs, option, count);
  if (files.length == 1) {
    return extractData(files[0]);
  }
  return files
    .map(function(file) {
      if(! existsSync(file)){
        return "\n"+extractData(file);
      }
      let header = "\n==> " + file + " <==\n";
      return header + extractData(file);
    })
    .join("\n")
    .slice(1);
};


module.exports = { extractOption, segregateInputs, extractContent, extractHeadContent , extractTailContent, head, tail};
