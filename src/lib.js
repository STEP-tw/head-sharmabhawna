const { take, last } = require("./util.js");
const { isInvalid, countOffsetError, existanceError } = require("./errors.js");
const { formatContent } = require("./format.js");

const selectDelimiter = function (option) {
  return option == "c" ? "" : "\n";
};

const extractRequiredContent = function (
  callingContext,
  fs,
  option,
  count,
  fileName
) {
  let delimiter = selectDelimiter(option);
  let contents = extractContent(fs, fileName).split(delimiter);
  let requiredContents = last(contents, count);
  if (callingContext == "head") {
    requiredContents = take(contents, count);
  }
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
  return fileNames
    .map(function (fileName) {
      let content = extractFileContent(
        callingContext,
        existanceChecker,
        contentExtractor,
        fileName
      );
      return formatContent(fileName, content);
    })
    .join("\n");
};

const applyRequiredFunc = function (
  callingContext,
  existanceChecker,
  contentExtractor,
  files
) {
  if (files.length == 1) {
    return extractFileContent(
      callingContext,
      existanceChecker,
      contentExtractor,
      files[0]
    );
  }
  return extractFilesContent(
    callingContext,
    existanceChecker,
    contentExtractor,
    files
  );
};

const headTail = function (callingContext, fs, { option, count, files }) {
  let { existsSync } = fs;
  if (isInvalid(count)) {
    return countOffsetError(callingContext, option, count);
  }
  let contentExtractor = extractRequiredContent.bind(
    null,
    callingContext,
    fs,
    option,
    count
  );
  return applyRequiredFunc(callingContext, existsSync, contentExtractor, files);
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