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

const extractSingleFileContent = function(callingContext, existanceCheckerFn, contentExtractorFn, file){
  if(! existanceCheckerFn(file)){
    return callingContext+": "+file+": No such file or directory";
  }
  return contentExtractorFn(file);
};

const addHeader = function(fileName) {
return "\n==> "+fileName+" <==\n";
};

const extractMultipleFilesContent = function(callingContext, existanceCheckerFn, contentExtractorFn, files){
  return files
    .map(function(file) {
      let data = extractSingleFileContent(callingContext, existanceCheckerFn, contentExtractorFn, file);
      if(data.match(/: No such file or directory/)){
        return "\n" + data;
      }
      return addHeader(file) + data;
    }).join("\n").slice(1);
};

const getContent = function(callingContext, existanceCheckerFn, contentExtractorFn, files){
  if (files.length == 1) {
    return extractSingleFileContent(callingContext, existanceCheckerFn, contentExtractorFn, files[0]);
  }
  return extractMultipleFilesContent(callingContext, existanceCheckerFn, contentExtractorFn, files);
}

const head = function(fs, { option, count, files }) {
  let lineCountError = "head: illegal line count -- ";

  let byteCountError = "head: illegal byte count -- ";

  let { existsSync } = fs;
  if (isInvalidCount(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count; 
  }
   let contentExtractor = extractHeadContent.bind(null, fs, option, count);
   return getContent("head", existsSync, contentExtractor, files);
};

const tail = function(fs, { option, count, files }) {
  let offsetError = "tail: illegal offset -- ";

  let { existsSync } = fs;
  if (isNaN(count)) {
    return offsetError + count;
  }
  let contentExtractor = extractTailContent.bind(null, fs, option, count);
  return getContent("tail", existsSync, contentExtractor, files);
};

module.exports = { extractContent, extractHeadContent , extractTailContent, head, tail };