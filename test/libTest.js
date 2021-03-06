const { equal, deepEqual } = require("assert");

const {
  selectDelimiter,
  extractRequiredContent,
  extractContent,
  generateFileDetail,
  generateFilesDetail,
  head,
  tail
} = require("../src/lib.js");

const { take, last } = require("../src/util.js");

const areMatched = function (arg1, arg2) {
  return arg1 === arg2;
};

const mockedReader = function (expectedFiles, expectedEnocoding) {
  return function (actualFileName, actualEnocoding) {
    if (areMatched(expectedEnocoding, actualEnocoding)) {
      return expectedFiles[actualFileName];
    }
  };
};

let files = { "vowels": "a\ne\ni\no\nu", "symbols": "*\n@\n%\n$\n#", "numbers": "", "operators": "" };

const mockedExistanceChecker = function (expectedFiles) {
  return function (actualFileName) {
    return expectedFiles[actualFileName] != undefined;
  };
};

const mockedFS = {
  readFileSync: mockedReader(files, "utf8"),
  existsSync: mockedExistanceChecker(files)
};

describe("selectDelimiter", function () {
  it("should return new line character if n is given as option", function () {
    equal(selectDelimiter("n"), "\n");
  });

  it("should return empty string if c is given as option", function () {
    equal(selectDelimiter("c"), "");
  });
});

describe("extractContent", function () {
  it("should return empty string for empty file", function () {
    equal(extractContent(mockedFS, "numbers"), "");
  });

  it("should return full content of file", function () {
    equal(extractContent(mockedFS, "symbols"), "*\n@\n%\n$\n#");
  });
});

describe("extractRequiredContent", function () {
  describe("context: head", function () {
    it("should return empty string when file is empty", function () {
      equal(extractRequiredContent(take, mockedFS, "n", 2, "numbers"), "");
    });

    it("should return first n lines of file when option is n", function () {
      equal(extractRequiredContent(take, mockedFS, "n", 2, "symbols"), "*\n@");
    });

    it("should return first n bytes of file when option is c", function () {
      equal(extractRequiredContent(take, mockedFS, "c", 2, "symbols"), "*\n");
    });
  });

  describe("context: tail", function () {
    it("should return empty string when file is empty", function () {
      equal(extractRequiredContent(last, mockedFS, "n", 2, "numbers"), "");
    });

    it("should return last n lines of file when option is n", function () {
      equal(extractRequiredContent(last, mockedFS, "n", 2, "symbols"), "$\n#");
    });

    it("should last return n bytes of file when option is c", function () {
      equal(extractRequiredContent(last, mockedFS, "c", 2, "symbols"), "\n#");
    });
  });
});

describe("generateFileDetail", function () {
  let existanceCheckerFn = mockedFS.existsSync;
  let contentExtractorFn = extractRequiredContent.bind("null", take, mockedFS, "n", 2);
  let extractDetail = generateFileDetail.bind("null", existanceCheckerFn, contentExtractorFn);

  it("should return file name with false existance and empty string as content when file is not present", function () {
    let expectedOutput = { "fileName": "letters", "exists": false, "content": "" };
    deepEqual(extractDetail("letters"), expectedOutput);
  });

  it("should return file name with true existance and its content when file is present", function () {
    let expectedOutput = { "fileName": "vowels", "exists": true, "content": "a\ne" };
    deepEqual(extractDetail("vowels"), expectedOutput);
  });
});

describe("generateFilesDetail", function () {
  let existanceCheckerFn = mockedFS.existsSync;
  let contentExtractorFn = extractRequiredContent.bind("null", take, mockedFS, "n", 2);
  let extractDetails = generateFilesDetail.bind("null", existanceCheckerFn, contentExtractorFn);

  it("should return array of objects of all files which has key information about file", function () {
    let expectedOutput = [{ "fileName": "letters", "exists": false, "content": "" }, { "fileName": "vowels", "exists": true, "content": "a\ne" }];
    deepEqual(extractDetails(["letters", "vowels"]), expectedOutput);
  });
});