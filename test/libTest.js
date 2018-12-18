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
  it("should return empty array when empty array is given", function () {
    deepEqual(take([], 2), []);
  });

  it("should return first n elements of array when n is less than array length", function () {
    deepEqual(take(["*", "@", "%", "$", "#"], 2), ["*", "@"]);
  });

  it("should return all elements when n is equal to than array length", function () {
    deepEqual(take(["*", "@", "%", "$", "#"], 5), ["*", "@", "%", "$", "#"]);
  });

  it("should return all elements when n is greater than array length", function () {
    deepEqual(take(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
  });
});

describe("last", function () {
  it("should return empty array when empty array is given", function () {
    deepEqual(last([], 2), []);
  });

  it("should return last n elements of array if n is less than array length", function () {
    deepEqual(last(["*", "@", "%", "$", "#"], 2), ["$", "#"]);
  });

  it("should return all elements when n is equal to than array length", function () {
    deepEqual(last(["*", "@", "%", "$", "#"], 5), ["*", "@", "%", "$", "#"]);
  });

  it("should return all elements when n is greater than array length", function () {
    deepEqual(last(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
  });
});

describe("extractRequiredContent", function () {
  describe("context: head", function () {
    it("should return empty string when file is empty", function () {
      equal(extractRequiredContent("head", mockedFS, "n", 2, "numbers"), "");
    });

    it("should return first n lines of file when option is n", function () {
      equal(extractRequiredContent("head", mockedFS, "n", 2, "symbols"), "*\n@");
    });

    it("should return first n bytes of file when option is c", function () {
      equal(extractRequiredContent("head", mockedFS, "c", 2, "symbols"), "*\n");
    });
  });

  describe("context: tail", function () {
    it("should return empty string when file is empty", function () {
      equal(extractRequiredContent("tail", mockedFS, "n", 2, "numbers"), "");
    });

    it("should return last n lines of file when option is n", function () {
      equal(extractRequiredContent("tail", mockedFS, "n", 2, "symbols"), "$\n#");
    });

    it("should last return n bytes of file when option is c", function () {
      equal(extractRequiredContent("tail", mockedFS, "c", 2, "symbols"), "\n#");
    });
  });
});

describe("extractFileContent", function () {
  let existanceCheckerFn = mockedFS.existsSync;

  describe("context: head", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 2);
    let extractContent = extractFileContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);

    it("should throw existance error for non-existing file", function () {
      let expectedOutput = "head: letters: No such file or directory";
      equal(extractContent("letters"), expectedOutput);
    });

    it("should return empty string when file is empty", function () {
      equal(extractContent("numbers"), "");
    });

    it("should return first n lines of file when option is n", function () {
      equal(extractContent("symbols"), "*\n@")
    });

    it("should return first n bytes of file when option is c", function () {
      let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "c", 2);
      let extractContent = extractFileContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
      equal(extractContent("symbols"), "*\n")
    });

  });

  describe("context: tail", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 2);
    let extractContent = extractFileContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);

    it("should throw existance error for non-existing file", function () {
      let expectedOutput = "tail: letters: No such file or directory";
      equal(extractContent("letters"), expectedOutput);
    });

    it("should return empty string when file is empty", function () {
      equal(extractContent("numbers"), "");
    });

    it("should return last n lines of file when option is n", function () {
      equal(extractContent("symbols"), "$\n#")
    });

    it("should return last n bytes of file when option is c", function () {
      let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "c", 2);
      let extractContent = extractFileContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
      equal(extractContent("symbols"), "\n#")
    });
  });
});

describe("extractFilesContent", function () {
  let existanceCheckerFn = mockedFS.existsSync;

  describe("context: head", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "n", 2);
    let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);

    it("should throw existance error for non existing files", function () {
      let expectedOutput = "head: letters: No such file or directory\nhead: characters: No such file or directory";
      equal(extractContent(["letters", "characters"]), expectedOutput);
    });

    it("should return blank lines seperated by file names when files are empty when option is n", function () {
      let expectedOutput = "==> numbers <==\n\n==> operators <==\n";
      equal(extractContent(["numbers", "operators"]), expectedOutput);
    });

    it("should throw error for non existing files and return first n lines of existing files when option is n", function () {
      let expectedOutput = "==> vowels <==\na\ne\nhead: characters: No such file or directory\n==> symbols <==\n*\n@";
      equal(extractContent(["vowels", "characters", "symbols"]), expectedOutput);
    });

    it("should return first n lines of all files seperated by their names when opton is n", function () {
      let expectedOutput = "==> symbols <==\n*\n@\n==> vowels <==\na\ne"
      equal(extractContent(["symbols", "vowels"]), expectedOutput);
    });

    it("should return first n bytes of all files seperated by their names when option is c", function () {
      let contentExtractorFn = extractRequiredContent.bind("null", "head", mockedFS, "c", 2);
      let extractContent = extractFilesContent.bind("null", "head", existanceCheckerFn, contentExtractorFn);
      let expectedOutput = "==> symbols <==\n*\n\n==> vowels <==\na\n"
      equal(extractContent(["symbols", "vowels"]), expectedOutput);
    });
  });
  describe("context: tail", function () {
    let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "n", 2);
    let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);

    it("should throw existance error for non existing files", function () {
      let expectedOutput = "tail: letters: No such file or directory\ntail: characters: No such file or directory";
      equal(extractContent(["letters", "characters"]), expectedOutput);
    });

    it("should return blank lines seperated by file names when files are empty when option is n", function () {
      let expectedOutput = "==> numbers <==\n\n==> operators <==\n";
      equal(extractContent(["numbers", "operators"]), expectedOutput);
    });

    it("should throw error for non existing files and return last n lines of existing files when option is n", function () {
      let expectedOutput = "==> vowels <==\no\nu\ntail: characters: No such file or directory\n==> symbols <==\n$\n#";
      equal(extractContent(["vowels", "characters", "symbols"]), expectedOutput);
    });

    it("should return last n lines of all files seperated by their names when opton is n", function () {
      let expectedOutput = "==> symbols <==\n$\n#\n==> vowels <==\no\nu"
      equal(extractContent(["symbols", "vowels"]), expectedOutput);
    });

    it("should return last n bytes of all files seperated by their names when option is c", function () {
      let contentExtractorFn = extractRequiredContent.bind("null", "tail", mockedFS, "c", 2);
      let extractContent = extractFilesContent.bind("null", "tail", existanceCheckerFn, contentExtractorFn);
      let expectedOutput = "==> symbols <==\n\n#\n==> vowels <==\n\nu"
      equal(extractContent(["symbols", "vowels"]), expectedOutput);
    });
  });
});

describe("head", function () {
  describe("should throw line count error when option is n", function () {
    it("and count is zero", function () {
      let parsedInputs = { option: "n", count: 0, files: ["symbols"] };
      let expectedOutput = "head: illegal line count -- 0";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("and count is not a number", function () {
      let parsedInputs = { option: "n", count: "1x", files: ["symbols"] };
      let expectedOutput = "head: illegal line count -- 1x";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });
  });

  describe("should throw byte count error when option is c", function () {
    it("and count is zero", function () {
      let parsedInputs = { option: "c", count: 0, files: ["symbols"] };
      let expectedOutput = "head: illegal byte count -- 0";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("and count is not a number", function () {
      let parsedInputs = { option: "c", count: "1x", files: ["symbols"] };
      let expectedOutput = "head: illegal byte count -- 1x";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });
  });

  describe("when single file is given", function () {
    it("should throw existance error for non-existing file", function () {
      let parsedInputs = { option: "n", count: 2, files: ["letters"] };
      let expectedOutput = "head: letters: No such file or directory";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("should return empty string when file is empty", function () {
      let parsedInputs = { option: "n", count: 2, files: ["numbers"] };
      equal(head(mockedFS, parsedInputs), "");
    });

    it("should return first n lines of file when option is n", function () {
      let parsedInputs = { option: "n", count: 2, files: ["symbols"] };
      equal(head(mockedFS, parsedInputs), "*\n@");
    });

    it("should return first n bytes of file when option is c", function () {
      let parsedInputs = { option: "c", count: 2, files: ["symbols"] };
      equal(head(mockedFS, parsedInputs), "*\n");
    });
  });

  describe("when multiple files are given", function () {
    it("should throw existance error for non-existing files", function () {
      let parsedInputs = { option: "c", count: 1, files: ["letters", "characters"] };
      let expectedOutput = "head: letters: No such file or directory\nhead: characters: No such file or directory"
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("shpuld return blank lines seperated by file names when files are empty", function () {
      let parsedInputs = { option: "n", count: 1, files: ["numbers", "operators"] };
      let expectedOutput = "==> numbers <==\n\n==> operators <==\n";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("should throw existance error for non-existing files and return first n lines of existing files", function () {
      let parsedInputs = { option: "n", count: 1, files: ["letters", "symbols", "characters"] };
      let expectedOutput = "head: letters: No such file or directory\n==> symbols <==\n*\nhead: characters: No such file or directory";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });

    it("should return first n lines of all files seperated by file names when option is n", function () {
      let parsedInputs = { option: "n", count: 2, files: ["vowels", "symbols"] };
      let expectedOutput = "==> vowels <==\na\ne\n==> symbols <==\n*\n@";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });
    it("should return first n bytes of all files seperated by file names when option is c", function () {
      let parsedInputs = { option: "c", count: 2, files: ["vowels", "symbols"] };
      let expectedOutput = "==> vowels <==\na\n\n==> symbols <==\n*\n";
      equal(head(mockedFS, parsedInputs), expectedOutput);
    });
  });
});

describe("tail", function () {
  describe("should throw offset error when count is not a number", function () {
    it("and option is n", function () {
      let parsedInputs = { option: "n", count: "1x", files: ["symbols"] };
      let expectedOutput = "tail: illegal offset -- 1x";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });

    it("and option is c", function () {
      let parsedInputs = { option: "c", count: "1x", files: ["symbols"] };
      let expectedOutput = "tail: illegal offset -- 1x";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });
  });

  describe("should return empty string when count is 0", function () {
    it("and option is n", function () {
      let parsedInputs = { option: "n", count: 0, files: ["symbols"] };
      equal(tail(mockedFS, parsedInputs), "");
    });

    it("and option is n", function () {
      let parsedInputs = { option: "c", count: 0, files: ["symbols"] };
      equal(tail(mockedFS, parsedInputs), "");
    });
  });

  describe("when single file is given", function () {
    it("should throw existance error for non-existing file", function () {
      let parsedInputs = { option: "n", count: 2, files: ["letters"] };
      let expectedOutput = "tail: letters: No such file or directory";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });

    it("should return empty string when file is empty", function () {
      let parsedInputs = { option: "n", count: 2, files: ["numbers"] };
      equal(tail(mockedFS, parsedInputs), "");
    });

    it("should return last n lines of file when option is n", function () {
      let parsedInputs = { option: "n", count: 2, files: ["symbols"] };
      equal(tail(mockedFS, parsedInputs), "$\n#");
    });

    it("should return last n bytes of file when option is c", function () {
      let parsedInputs = { option: "c", count: 2, files: ["symbols"] };
      equal(tail(mockedFS, parsedInputs), "\n#");
    });
  });

  describe("when multiple files are given", function () {
    it("should throw existance error for non-existing files", function () {
      let parsedInputs = { option: "c", count: 1, files: ["letters", "characters"] };
      let expectedOutput = "tail: letters: No such file or directory\ntail: characters: No such file or directory"
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });

    it("shpuld return blank lines seperated by file names when files are empty", function () {
      let parsedInputs = { option: "n", count: 1, files: ["numbers", "operators"] };
      let expectedOutput = "==> numbers <==\n\n==> operators <==\n";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });

    it("should throw existance error for non-existing files and return last n lines of existing files", function () {
      let parsedInputs = { option: "n", count: 1, files: ["letters", "symbols", "characters"] };
      let expectedOutput = "tail: letters: No such file or directory\n==> symbols <==\n#\ntail: characters: No such file or directory";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });

    it("should return last n lines of all files seperated by file names when option is n", function () {
      let parsedInputs = { option: "n", count: 2, files: ["vowels", "symbols"] };
      let expectedOutput = "==> vowels <==\no\nu\n==> symbols <==\n$\n#";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });
    it("should return last n bytes of all files seperated by file names when option is c", function () {
      let parsedInputs = { option: "c", count: 2, files: ["vowels", "symbols"] };
      let expectedOutput = "==> vowels <==\n\nu\n==> symbols <==\n\n#";
      equal(tail(mockedFS, parsedInputs), expectedOutput);
    });
  });
});