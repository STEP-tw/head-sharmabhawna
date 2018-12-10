let lineCountError = "head: illegal line count -- ";

let byteCountError = "head: illegal byte count -- ";

let offsetError = "tail: illegal offset -- ";

const extractSeperator = function(option) {
  if(option == "c"){
    return "";
  }
  return "\n";
}

const extractHeadContent = function(fs, option, count, fileName) {
  let seperator = extractSeperator(option);
  return extractContent(fs, fileName).split(seperator).slice(0, count).join(seperator);
}

const extractTailContent = function(fs, option, count, fileName) {
  let seperator = extractSeperator(option);
  let content = extractContent(fs, fileName);
  let contents = content.split(seperator);
  let lengthOfFile = contents.length;
  let requiredCount = lengthOfFile-count;
  if(count > lengthOfFile){
    requiredCount = 0;
  }
  return contents.slice(requiredCount).join(seperator);
}

const extractContent = function(fs, fileName) {
  let { readFileSync, existsSync } = fs;
  return readFileSync(fileName, "utf8");
};

const isInvalidCount = function(count) {
  return count == 0 || isNaN(count);
}

const extractSingleFileData = function(context, validatorfn, dataExtractorFn, file){
  if(! validatorfn(file)){
    return context+": "+file+": No such file or directory";
  }
  return dataExtractorFn(file);
}

const extractMultipleFilesData = function(context, validatorfn, dataExtractorFn, files){
  return files
    .map(function(file) {
      if(! validatorfn(file)){
        return "\n"+context+": "+file+": No such file or directory";
      }
      let header = "\n==> " + file + " <==\n";
      return header + dataExtractorFn(file);
    })
    .join("\n")
    .slice(1);
}

const head = function(fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isInvalidCount(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count;
  }
  let extractData = extractHeadContent.bind(null, fs, option, count);
  if (files.length == 1) {
    return extractSingleFileData("head", existsSync, extractData, files[0]);
  }
  return extractMultipleFilesData("head", existsSync, extractData, files);
};

const tail = function(fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isNaN(count)) {
    return offsetError + count;
  }
  let extractData = extractTailContent.bind(null, fs, option, count);
  if (files.length == 1) {
    return extractSingleFileData("tail", existsSync, extractData, files[0]);
  }
  return extractMultipleFilesData("tail", existsSync, extractData, files);
};
  

module.exports = { extractContent, extractHeadContent , extractTailContent, head, tail};