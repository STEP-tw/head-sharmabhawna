const { take, last, zip } = require("./util.js");
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

const generateFileDetail = function (
  existanceChecker,
  contentExtractor,
  fileName
) {
  let exists = existanceChecker(fileName);
  let content = "";
  if (exists) {
    content = contentExtractor(fileName);
  }
  return { fileName, exists, content };
};

const generateFilesDetail = function (
  existanceChecker,
  contentExtractor,
  fileNames
) {
  let extractDetail = generateFileDetail.bind("null", existanceChecker, contentExtractor);
  return fileNames.map(extractDetail);

};

const headTail = function (callingContext, fs, { option, count, files }) {
  let { existsSync } = fs;
  const extractHeadContent = extractRequiredContent.bind("null", take, fs, option, count);
  const extractTailContent = extractRequiredContent.bind("null", last, fs, option, count);

  let requiredContentExtractor = { "head": extractHeadContent, "tail": extractTailContent };
  let contentExtractor = requiredContentExtractor[callingContext];
  let details = generateFilesDetail(existsSync, contentExtractor, files);
  return formatData(callingContext, details);
};

const head = headTail.bind(null, "head");
const tail = headTail.bind(null, "tail");

module.exports = {
  selectDelimiter,
  extractRequiredContent,
  extractContent,
  generateFileDetail,
  generateFilesDetail,
  head,
  tail
};