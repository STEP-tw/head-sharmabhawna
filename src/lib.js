const selectDelimiter = function(option) {
 return option == "c" ? "" : "\n";
};

const extractRequiredContent = function(callingContext, fs, option, count, fileName) {
  let delimiter = selectDelimiter(option);
  let splittedContent = extractContent(fs, fileName).split(delimiter);
  let slicedContent = extractTailContent(splittedContent, count);
  if(callingContext == "head"){
    slicedContent = extractHeadContent(splittedContent, count);
  }
  return slicedContent.join(delimiter);
};

const extractHeadContent = function(contents, count) {
  return contents.slice(0, count);
};

const extractTailContent = function(contents, count) {
  let lengthOfFile = contents.length;
  let requiredCount = lengthOfFile-count;
  if(count > lengthOfFile){
    requiredCount = 0;
  }
  return contents.slice(requiredCount);
};

const extractContent = function(fs, fileName) {
  let { readFileSync } = fs;
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

const generateHeader = function(fileName){
  return "\n==> " + fileName + " <==\n";
};

const extractMultipleFilesContent = function(callingContext, existanceCheckerFn, contentExtractorFn, files){
  return files
    .map(function(file) {
      let data = extractSingleFileContent(callingContext, existanceCheckerFn, contentExtractorFn, file);
      if(data.match(/: No such file or directory/)){
        return "\n" + data;
      }
      return generateHeader(file) + data;
    }).join("\n").slice(1);
};

const applyRequiredFunc = function(callingContext, existanceCheckerFn, contentExtractorFn, files){
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
   let contentExtractor = extractRequiredContent.bind(null, "head", fs, option, count);
   return applyRequiredFunc("head", existsSync, contentExtractor, files);
};

const tail = function(fs, { option, count, files }) {
  let offsetError = "tail: illegal offset -- ";

  let { existsSync } = fs;
  if(isNaN(count)) {
    return offsetError + count;
  }
  let contentExtractor = extractRequiredContent.bind(null, "tail", fs, option, count);
  return applyRequiredFunc("tail", existsSync, contentExtractor, files);
};

module.exports = { selectDelimiter, generateHeader, extractRequiredContent, extractContent, extractHeadContent, extractTailContent, head, tail };