const { take, last, zip } = require("./util.js");
const { isInvalid, countOffsetError, existanceError } = require("./errors.js");
const { formatData } = require("./format.js");

const selectDelimiter = function (option) {
  return option == "c" ? "" : "\n";
};

const extractRequiredContent = function (
  slicer,
  fs,
  option,
  count,
  fileName
) {
  let delimiter = selectDelimiter(option);
  let contents = extractContent(fs, fileName).split(delimiter);
  requiredContents = slicer(contents, count);
  return requiredContents.join(delimiter);
};

const extractContent = function (fs, fileName) {
  let { readFileSync } = fs;
  return readFileSync(fileName, "utf8");
};

const extractFileContent = function (
  callingContext,
  existanceChecker,
  contentExtractor,
  fileName
) {
  if (!existanceChecker(fileName)) {
    return existanceError(callingContext, fileName);
  }
  return contentExtractor(fileName);
};

const extractFilesContent = function (
  callingContext,
  existanceChecker,
  contentExtractor,
  fileNames
) {
  let getContent = extractFileContent.bind("null", callingContext, existanceChecker, contentExtractor);
  let contents = fileNames.map(getContent);
  let filesDetail = zip(fileNames, contents);
  return formatData(filesDetail);
};

const headTail = function (callingContext, fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isInvalid(count)) {
    return countOffsetError(callingContext, option, count);
  }
  const extractHeadContent = extractRequiredContent.bind("null", take, fs, option, count);
  const extractTailContent = extractRequiredContent.bind("null", last, fs, option, count);

  let requiredContentExtractor = { "head": extractHeadContent, "tail": extractTailContent };
  let contentExtractor = requiredContentExtractor[callingContext];
  return extractFilesContent(callingContext, existsSync, contentExtractor, files);
};

const head = headTail.bind(null, "head");
const tail = headTail.bind(null, "tail");

module.exports = {
  selectDelimiter,
  extractRequiredContent,
  extractContent,
  extractFileContent,
  extractFilesContent,
  head,
  tail
};