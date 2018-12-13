const selectDelimiter = function(option) {
 return option == "c" ? "" : "\n";
};

const split = function(data, option){
  let delimiter = selectDelimiter(option);
  return data.split(delimiter);
}

const join = function(data, option){
  let delimiter = selectDelimiter(option);
  return data.join(delimiter);
}

const extractHeadContent = function(fs, option, count, fileName) {
  let contents = split(extractContent(fs, fileName), option).slice(0, count);
  return join(contents, option);
};

const extractTailContent = function(fs, option, count, fileName) {
  let contents = split(extractContent(fs, fileName), option);
  let lengthOfFile = contents.length;
  let requiredCount = lengthOfFile-count;
  if(count > lengthOfFile){
    requiredCount = 0;
  }
  return join(contents.slice(requiredCount), option);
};

const extractContent = function(fs, fileName) {
  let { readFileSync, existsSync } = fs;
  return readFileSync(fileName, "utf8");
};

const isInvalidCount = function(count) {
  return count == 0 || isNaN(count);
};

const extractSingleFileData = function(callingContext, existanceCheckerFn, dataExtractorFn, file){
  if(! existanceCheckerFn(file)){
    return callingContext+": "+file+": No such file or directory";
  }
  return dataExtractorFn(file);
};

const addHeader = function(fileName) {
return "==> "+fileName+" <==\n";
};

const extractMultipleFilesData = function(callingContext, existanceCheckerFn, dataExtractorFn, files){
  return files
    .map(function(file) {
      let data = extractSingleFileData(callingContext, existanceCheckerFn, dataExtractorFn, file);
      if(data.match(/: No such file or directory/)){
        return "\n"+data;
      }
      return "\n"+addHeader(file) + data;
    }).join("\n").slice(1);
};

const getContent = function(callingContext, existanceCheckerFn, dataExtractorFn, files){
  if (files.length == 1) {
    return extractSingleFileData(callingContext, existanceCheckerFn, dataExtractorFn, files[0]);
  }
  return extractMultipleFilesData(callingContext, existanceCheckerFn, dataExtractorFn, files);
}

const head = function(fs, { option, count, files }) {
  let lineCountError = "head: illegal line count -- ";

  let byteCountError = "head: illegal byte count -- ";

  let { existsSync } = fs;
  if (isInvalidCount(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count; 
  }
   let extractData = extractHeadContent.bind(null, fs, option, count);
   return getContent("head", existsSync, extractData, files);
};

const tail = function(fs, { option, count, files }) {
  let offsetError = "tail: illegal offset -- ";

  let { existsSync } = fs;
  if (isNaN(count)) {
    return offsetError + count;
  }
  let extractData = extractTailContent.bind(null, fs, option, count);
  return getContent("tail", existsSync, extractData, files);
};

module.exports = { extractContent, extractHeadContent , extractTailContent, head, tail };