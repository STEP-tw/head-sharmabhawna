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

const take = function (contents, count) {
  return contents.slice(0, count);
};

const last = function (contents, count) {
  return contents.slice(-count);
};

const extractContent = function (fs, fileName) {
  let { readFileSync } = fs;
  return readFileSync(fileName, "utf8");
};

const isInvalid = function (count) {
  return count == 0 || isNaN(count);
};

const extractFileContent = function (
  callingContext,
  existanceCheckerFn,
  contentExtractorFn,
  file
) {
  if (!existanceCheckerFn(file)) {
    return callingContext + ": " + file + ": No such file or directory";
  }
  return contentExtractorFn(file);
};

const generateHeader = function (fileName) {
  return "\n==> " + fileName + " <==\n";
};

const extractFilesContent = function (
  callingContext,
  existanceCheckerFn,
  contentExtractorFn,
  files
) {
  return files
    .map(function (file) {
      let content = extractFileContent(
        callingContext,
        existanceCheckerFn,
        contentExtractorFn,
        file
      );
      if (content.match(/: No such file or directory/)) {
        return "\n" + content;
      }
      return generateHeader(file) + content;
    })
    .join("\n")
    .slice(1);
};

const applyRequiredFunc = function (
  callingContext,
  existanceCheckerFn,
  contentExtractorFn,
  files
) {
  if (files.length == 1) {
    return extractFileContent(
      callingContext,
      existanceCheckerFn,
      contentExtractorFn,
      files[0]
    );
  }
  return extractFilesContent(
    callingContext,
    existanceCheckerFn,
    contentExtractorFn,
    files
  );
};

const head = function (fs, { option, count, files }) {
  let lineCountError = "head: illegal line count -- ";

  let byteCountError = "head: illegal byte count -- ";

  let { existsSync } = fs;
  if (isInvalid(count)) {
    return option == "n" ? lineCountError + count : byteCountError + count;
  }
  let contentExtractor = extractRequiredContent.bind(
    null,
    "head",
    fs,
    option,
    count
  );
  return applyRequiredFunc("head", existsSync, contentExtractor, files);
};

const tail = function (fs, { option, count, files }) {
  let offsetError = "tail: illegal offset -- ";

  let { existsSync } = fs;
  if (isInvalid(count)) {
    return count == 0 ? "" : offsetError + count;
  }
  let contentExtractor = extractRequiredContent.bind(
    null,
    "tail",
    fs,
    option,
    count
  );
  return applyRequiredFunc("tail", existsSync, contentExtractor, files);
};

module.exports = {
  selectDelimiter,
  generateHeader,
  isInvalid,
  extractRequiredContent,
  extractContent,
  take,
  last,
  extractFileContent,
  extractFilesContent,
  head,
  tail
};
