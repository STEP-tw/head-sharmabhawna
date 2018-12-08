let lineCountError = "head: illegal line count -- ";

let byteCountError = "head: illegal byte count -- ";

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
  result.count = inputs[0].slice(1);

  if (inputs[0].length >= 3 && inputs[0].match("[a-z]")) {
    result.count = inputs[0].slice(2);
  }

  if (!isNaN(inputs[1])) {
    result.count = inputs[1];
    result.files = inputs.slice(2);
  }
  return result;
};

const extractContent = function(fs, option, count, file) {
  let { readFileSync, existsSync } = fs;
  let seperator = "\n";
  if (option == "c") {
    seperator = "";
  }
  if (!existsSync(file)) {
    return "head: " + file + ": No such file or directory";
  }
  return readFileSync(file, "utf8")
    .split(seperator)
    .slice(0, count)
    .join(seperator);
};

const isInvalidCount = function(count) {
  return count == 0 || isNaN(count);
}

const head = function(fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isInvalidCount(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count;
  }
  let extractData = extractContent.bind(null, fs, option, count);
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

module.exports = { extractOption, segregateInputs, head, extractContent };
