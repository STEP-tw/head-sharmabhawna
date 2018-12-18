const { equal, deepEqual } = require("assert");

const {
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
} = require("../src/lib.js");

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

let files = { "vowels": "a\ne\ni\no\nu", "symbols": "*\n@\n%\n$\n#", "numbers": "" };

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

describe("generateHeader", function () {
  it("should return header of given file name", function () {
    equal(generateHeader("symbols"), "==> symbols <==");
  });
});

describe("isInvalid", function () {
  it("should return true when count is 0", function () {
    equal(isInvalid(0), true);
  });

  it("should return true when count is non a number", function () {
    equal(isInvalid("10x"), true);
  });

  it("should return false when count is number", function () {
    equal(isInvalid(10), false);
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

describe("take", function () {
  it("should return given count of elements from start of an array if count is less than array length", function () {
    deepEqual(take(["*", "@", "%", "$", "#"], 1), ["*"]);
    deepEqual(take(["*", "@", "%", "$", "#"], 2), ["*", "@"]);
  });

  it("should return all elements if count is greater than array length", function () {
    deepEqual(take(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
    deepEqual(take(["*", "@", "%", "$", "#"], 20), ["*", "@", "%", "$", "#"]);
  });
});

describe("last", function () {
  it("should return given count of elements from end of an array if count is less than array length", function () {
    deepEqual(last(["*", "@", "%", "$", "#"], 1), ["#"]);
    deepEqual(last(["*", "@", "%", "$", "#"], 2), ["$", "#"]);
  });

  it("should return all elements if count is greater than array length", function () {
    deepEqual(last(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
    deepEqual(last(["*", "@", "%", "$", "#"], 20), ["*", "@", "%", "$", "#"]);
  });
});

describe("extractRequiredContent", function () {
  it("should return count of lines from top if calling context is head and option is n", function () {
    equal(extractRequiredContent("head", mockedFS, "n", 1, "symbols"), "*");
    equal(extractRequiredContent("head", mockedFS, "n", 2, "symbols"), "*\n@");
  });

  it("should return count of bytes from top if calling context is head and and option is c", function () {
    equal(extractRequiredContent("head", mockedFS, "c", 1, "symbols"), "*");
    equal(extractRequiredContent("head", mockedFS, "c", 2, "symbols"), "*\n");
  });

  it("should return count of lines from bottom if calling context is tail and and option is n", function () {
    equal(extractRequiredContent("tail", mockedFS, "n", 1, "symbols"), "#");
    equal(extractRequiredContent("tail", mockedFS, "n", 2, "symbols"), "$\n#");
  });

  it("should return count of bytes from bottom if calling context is tail and and option is c", function () {
    equal(extractRequiredContent("tail", mockedFS, "c", 1, "symbols"), "#");
    equal(extractRequiredContent("tail", mockedFS, "c", 2, "symbols"), "\n#");
  });
});

describe("extractFileContent", function () {
  let existanceCheckerFn = mockedFS.existsSync;

  it("should return first byte of given file", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "c", 1);
    let extractContent = extractFileContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
    equal(extractContent("symbols"), "*")
    equal(extractContent("vowels"), "a")
  });

  it("should return first line of given file", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 1);
    let extractContent = extractFileContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
    equal(extractContent("symbols"), "*")
    equal(extractContent("vowels"), "a")
  });

  it("should return file non existance error w.r.t head", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "c", 1);
    let extractContent = extractFileContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "head: letters: No such file or directory";

    equal(extractContent("letters"), expectedOutput);
  });

  it("should return last byte of given file", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "c", 1);
    let extractContent = extractFileContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);

    equal(extractContent("symbols"), "#")
    equal(extractContent("vowels"), "u")
  });

  it("should return last line of given file", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 1);
    let extractContent = extractFileContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);

    equal(extractContent("symbols"), "#")
    equal(extractContent("vowels"), "u")
  });

  it("should return file non existance error w.r.t tail", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "c", 1);
    let extractContent = extractFileContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "tail: letters: No such file or directory";

    equal(extractContent("letters"), expectedOutput);
  });
});

describe("extractFilesContent", function () {
  let existanceCheckerFn = mockedFS.existsSync;

  it("should return first byte of all files seperated by their names", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "c", 1);
    let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "==> symbols <==\n*\n==> vowels <==\na"

    equal(extractContent(["symbols", "vowels"]), expectedOutput);
  });

  it("should return first line of all files seperated by their names", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 1);
    let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "==> symbols <==\n*\n==> vowels <==\na"

    equal(extractContent(["symbols", "vowels"]), expectedOutput);
  });

  it("should throw files non existance error w.r.t head", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 1);
    let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);

    let expectedOutput = "head: letters: No such file or directory\nhead: characters: No such file or directory";
    equal(extractContent(["letters", "characters"]), expectedOutput);
  });

  it("should throw error for non existing files and return first two lines of existing files", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 2);
    let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);

    let expectedOutput = "==> vowels <==\na\ne\nhead: characters: No such file or directory\n==> symbols <==\n*\n@";
    equal(extractContent(["vowels", "characters", "symbols"]), expectedOutput);
  });

  it("should return last byte of all files seperated by their names", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "c", 1);
    let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "==> symbols <==\n#\n==> vowels <==\nu"

    equal(extractContent(["symbols", "vowels"]), expectedOutput);
  });

  it("should return last line of all files seperated by their names", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 1);
    let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "==> symbols <==\n#\n==> vowels <==\nu"

    equal(extractContent(["symbols", "vowels"]), expectedOutput);
  });

  it("should throw files non existance error w.r.t tail", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 1);
    let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
    let expectedOutput = "tail: letters: No such file or directory\ntail: characters: No such file or directory";

    equal(extractContent(["letters", "characters"]), expectedOutput);
  });

  it("should throw error for non existing files and return last two lines of existing files", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 2);
    let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);

    let expectedOutput = "==> vowels <==\no\nu\ntail: characters: No such file or directory\n==> symbols <==\n$\n#";
    equal(extractContent(["vowels", "characters", "symbols"]), expectedOutput);
  });
});

describe("head", function () {
  it("should throw byte count error when option is c and count is zero", function () {
    let parsedInputs = { option: "c", count: 0, files: ["symbols"] };
    let expectedOutput = "head: illegal byte count -- 0";

    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw line count error when option is n count is zero", function () {
    let parsedInputs = { option: "n", count: 0, files: ["symbols"] };
    let expectedOutput = "head: illegal line count -- 0";

    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw byte count error when option is c and count is not a number", function () {
    let parsedInputs = { option: "c", count: "1x", files: ["symbols"] };
    let expectedOutput = "head: illegal byte count -- 1x";

    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw line count error when option is n and count is not a number", function () {
    let parsedInputs = { option: "n", count: "1x", files: ["symbols"] };
    let expectedOutput = "head: illegal line count -- 1x";

    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return first byte of file", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols"] };
    equal(head(mockedFS, parsedInputs), "*");
  });

  it("should return first two bytes of file", function () {
    let parsedInputs = { option: "c", count: 2, files: ["symbols"] };
    equal(head(mockedFS, parsedInputs), "*\n");
  });

  it("should return first line of file", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols"] };
    equal(head(mockedFS, parsedInputs), "*");
  });

  it("should return first two lines of file", function () {
    let parsedInputs = { option: "n", count: 2, files: ["symbols"] };
    equal(head(mockedFS, parsedInputs), "*\n@");
  });

  it("should return first byte of all files seperated by file names", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols", "vowels"] };
    let expectedOutput = "==> symbols <==\n*\n==> vowels <==\na";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return first two bytes of all files seperated by file names", function () {
    let parsedInputs = { option: "c", count: 2, files: ["vowels", "symbols"] };
    let expectedOutput = "==> vowels <==\na\n\n==> symbols <==\n*\n";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return first line of all files seperated by file names", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols", "vowels"] };
    let expectedOutput = "==> symbols <==\n*\n==> vowels <==\na";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return first two lines of all files seperated by file names", function () {
    let parsedInputs = { option: "n", count: 2, files: ["vowels", "symbols"] };
    let expectedOutput = "==> vowels <==\na\ne\n==> symbols <==\n*\n@";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw error that file is not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters"] };
    let expectedOutput = "head: letters: No such file or directory";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw error that files are not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters", "characters"] };
    let expectedOutput = "head: letters: No such file or directory\nhead: characters: No such file or directory"
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should throw error for file that is not present and then return first byte of existing file", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters", "symbols"] };
    let expectedOutput = "head: letters: No such file or directory\n==> symbols <==\n*";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should return first byte of existing file and then throw error for file that is not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols", "letters"] };
    let expectedOutput = "==> symbols <==\n*\nhead: letters: No such file or directory";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should throw error for file that is not present and then return first line of existing file", function () {
    let parsedInputs = { option: "n", count: 1, files: ["letters", "symbols"] };
    let expectedOutput = "head: letters: No such file or directory\n==> symbols <==\n*";
    equal(head(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should return first line of existing file and then throw error for file that is not present", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols", "letters"] };
    let expectedOutput = "==> symbols <==\n*\nhead: letters: No such file or directory";
    equal(head(mockedFS, parsedInputs), expectedOutput);

  });
});

describe("tail", function () {
  it("should return empty string when option is c count is zero", function () {
    let parsedInputs = { option: "c", count: 0, files: ["symbols"] };
    let expectedOutput = "";

    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return empty string when option is n and count is zero", function () {
    let parsedInputs = { option: "n", count: 0, files: ["symbols"] };
    let expectedOutput = "";

    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw offset error if option is n and count is not a number", function () {
    let parsedInputs = { option: "c", count: "1x", files: ["symbols"] };
    let expectedOutput = "tail: illegal offset -- 1x";

    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw offset error if option is n and count is not a number", function () {
    let parsedInputs = { option: "n", count: "1x", files: ["symbols"] };
    let expectedOutput = "tail: illegal offset -- 1x";

    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return last byte of file", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols"] };
    equal(tail(mockedFS, parsedInputs), "#");
  });

  it("should return last two bytes of file", function () {
    let parsedInputs = { option: "c", count: 2, files: ["symbols"] };
    equal(tail(mockedFS, parsedInputs), "\n#");
  });

  it("should return last line of file", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols"] };
    equal(tail(mockedFS, parsedInputs), "#");
  });

  it("should return last two lines of file", function () {
    let parsedInputs = { option: "n", count: 2, files: ["symbols"] };
    equal(tail(mockedFS, parsedInputs), "$\n#");
  });

  it("should return last byte of all files seperated by file names", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols", "vowels"] };
    let expectedOutput = "==> symbols <==\n#\n==> vowels <==\nu";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return last two bytes of all files seperated by file names", function () {
    let parsedInputs = { option: "c", count: 2, files: ["vowels", "symbols"] };
    let expectedOutput = "==> vowels <==\n\nu\n==> symbols <==\n\n#";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return last line of all files seperated by file names", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols", "vowels"] };
    let expectedOutput = "==> symbols <==\n#\n==> vowels <==\nu";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should return last two lines of all files seperated by file names", function () {
    let parsedInputs = { option: "n", count: 2, files: ["vowels", "symbols"] };
    let expectedOutput = "==> vowels <==\no\nu\n==> symbols <==\n$\n#";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw error that file is not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters"] };
    let expectedOutput = "tail: letters: No such file or directory";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("should throw error that files are not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters", "characters"] };
    let expectedOutput = "tail: letters: No such file or directory\ntail: characters: No such file or directory"
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should throw error for file that is not present and then return last byte of existing file", function () {
    let parsedInputs = { option: "c", count: 1, files: ["letters", "symbols"] };
    let expectedOutput = "tail: letters: No such file or directory\n==> symbols <==\n#";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should return last byte of existing file and then throw error for file that is not present", function () {
    let parsedInputs = { option: "c", count: 1, files: ["symbols", "letters"] };
    let expectedOutput = "==> symbols <==\n#\ntail: letters: No such file or directory";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should throw error for file that is not present and then return last line of existing file", function () {
    let parsedInputs = { option: "n", count: 1, files: ["letters", "symbols"] };
    let expectedOutput = "tail: letters: No such file or directory\n==> symbols <==\n#";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

  it("firstly should return last line of existing file and then throw error for file that is not present", function () {
    let parsedInputs = { option: "n", count: 1, files: ["symbols", "letters"] };
    let expectedOutput = "==> symbols <==\n#\ntail: letters: No such file or directory";
    equal(tail(mockedFS, parsedInputs), expectedOutput);
  });

});