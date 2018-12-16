const { equal, deepEqual } = require("assert");

const {
  selectDelimiter,
  generateHeader,
  isInvalid,
  extractRequiredContent,
  extractContent,
  extractHeadContent,
  extractTailContent,
  head,
  tail
} = require("../src/lib.js");

describe("selectDelimiter", function() {
  it("should return new line character if n is given as option", function() {
    equal(selectDelimiter("n"), "\n");
  });

  it("should return empty string if n is given as option", function() {
    equal(selectDelimiter("c"), "");
  });
});

describe("generateHeader", function() {
  it("should return header of given file name", function() {
    equal(generateHeader("symbols"), "\n==> symbols <==\n");
    equal(generateHeader("letters"), "\n==> letters <==\n");
  });
});

describe("isInvalid", function(){
  it("should return true when count is 0", function(){
    equal(isInvalid(0), true);
  });

  it("should return true when count is non a number", function(){
    equal(isInvalid("0x"), true);
    equal(isInvalid("10x"), true);
  });

  it("should return false when count is number", function(){
    equal(isInvalid(1), false);
    equal(isInvalid(10), false);
  });
});

const areMatched = function(arg1, arg2) {
  return arg1 === arg2;
};

const areFilesAndEnocodingSame = function(expectedFileName, actualFileName, expectedEnocoding, actualEnocoding) {
  return areMatched(expectedFileName, actualFileName) && areMatched(expectedEnocoding, actualEnocoding);
};

const mockedReader = function(expectedFileName, expectedEnocoding, content) {
  return function(actualFileName, actualEnocoding) {
    if (areFilesAndEnocodingSame(expectedFileName, actualFileName, expectedEnocoding, actualEnocoding)) {
      return content;
    }
  };
};

const mockedExistanceChecker = function(expectedFileName) {
  return function(actualFileName) {
    return areMatched(expectedFileName, actualFileName);
  };
};

const symbolsReader = mockedReader("symbols", "utf8", "*\n@\n%\n$\n#");

const symblosExistanceChecker = mockedExistanceChecker("symbols");

const mockedFS = {
  readFileSync: symbolsReader,
  existsSync: symblosExistanceChecker
};

describe("extractContent", function() {
  it("should return full content of file", function() {
    equal(extractContent(mockedFS, "symbols"), "*\n@\n%\n$\n#");
  });
});

describe("extractHeadContent", function() {
  it("should return given count of elements from start of an array", function() {
    deepEqual(extractHeadContent(["*", "@", "%", "$", "#"], 1), ["*"]);
    deepEqual(extractHeadContent(["*", "@", "%", "$", "#"], 2), ["*", "@"]);
  });
});

describe("extractTailContent", function() {
  it("should return given count of elements from end of an array", function() {
    deepEqual(extractTailContent(["*", "@", "%", "$", "#"], 1), ["#"]);
    deepEqual(extractTailContent(["*", "@", "%", "$", "#"], 2), ["$", "#"]);
  });
});

describe("extractRequiredContent", function() {
  it("should return count of lines from top if calling context is head and and option is n", function() {
    equal(extractRequiredContent("head", mockedFS, "n", 1, "symbols"), "*");
    equal(extractRequiredContent("head", mockedFS, "n", 2, "symbols"), "*\n@");
  });

  it("should return count of bytes from top if calling context is head and and option is c", function() {
    equal(extractRequiredContent("head", mockedFS, "c", 1, "symbols"), "*");
    equal(extractRequiredContent("head", mockedFS, "c", 2, "symbols"), "*\n");
  });

  it("should return count of lines from bottom if calling context is tail and and option is n", function() {
    equal(extractRequiredContent("tail", mockedFS, "n", 1, "symbols"), "#");
    equal(extractRequiredContent("tail", mockedFS, "n", 2, "symbols"), "$\n#");
  });

  it("should return count of bytes from bottom if calling context is tail and and option is c", function() {
    equal(extractRequiredContent("tail", mockedFS, "c", 1, "symbols"), "#");
    equal(extractRequiredContent("tail", mockedFS, "c", 2, "symbols"), "\n#");
  });
});

describe("head", function() {
  it("should throw error that count is zero", function() {
    equal(
      head(mockedFS, { option: "c", count: 0, files: ["symbols"] }),
      "head: illegal byte count -- 0"
    );
    equal(
      head(mockedFS, { option: "n", count: 0, files: ["symbols"] }),
      "head: illegal line count -- 0"
    );
  });

  it("should throw error that count is invalid or non-numeric", function() {
    equal(
      head(mockedFS, { option: "c", count: "1x", files: ["symbols"] }),
      "head: illegal byte count -- 1x"
    );
    equal(
      head(mockedFS, { option: "n", count: "1x", files: ["symbols"] }),
      "head: illegal line count -- 1x"
    );
  });

  it("should return given count of bytes of file from top if option is c", function() {
    equal(head(mockedFS, { option: "c", count: 1, files: ["symbols"] }), "*");
    equal(head(mockedFS, { option: "c", count: 2, files: ["symbols"] }), "*\n");
  });

  it("should return given count of lines of file from top if option is n", function() {
    equal(head(mockedFS, { option: "n", count: 1, files: ["symbols"] }), "*");
    equal(
      head(mockedFS, { option: "n", count: 2, files: ["symbols"] }),
      "*\n@"
    );
  });

  it("should return given count of bytes of all files from top seperated by file names if option is c", function() {
    equal(
      head(mockedFS, { option: "c", count: 1, files: ["symbols", "symbols"] }),
      "==> symbols <==\n*\n\n==> symbols <==\n*"
    );
    equal(
      head(mockedFS, { option: "c", count: 2, files: ["symbols", "symbols"] }),
      "==> symbols <==\n*\n\n\n==> symbols <==\n*\n"
    );
  });

  it("should return given count of lines of all files from top seperated by file names if option is n", function() {
    equal(
      head(mockedFS, { option: "n", count: 1, files: ["symbols", "symbols"] }),
      "==> symbols <==\n*\n\n==> symbols <==\n*"
    );
    equal(
      head(mockedFS, { option: "n", count: 2, files: ["symbols", "symbols"] }),
      "==> symbols <==\n*\n@\n\n==> symbols <==\n*\n@"
    );
  });

  it("should throw error if file is not present", function() {
    equal(
      head(mockedFS, { option: "c", count: 1, files: ["letters"] }),
      "head: letters: No such file or directory"
    );
    equal(
      head(mockedFS, { option: "n", count: 2, files: ["letters"] }),
      "head: letters: No such file or directory"
    );
  });

  it("should throw error for files those are not present and return given count of bytes of existing files from top", function() {
    equal(
      head(mockedFS, { option: "c", count: 1, files: ["letters", "symbols"] }),
      "head: letters: No such file or directory\n\n==> symbols <==\n*"
    );
    equal(
      head(mockedFS, { option: "c", count: 1, files: ["symbols", "letters"] }),
      "==> symbols <==\n*\n\nhead: letters: No such file or directory"
    );
  });

  it("should throw error for files those are not present and return given count of lines of existing files from top", function() {
    equal(
      head(mockedFS, { option: "n", count: 1, files: ["letters", "symbols"] }),
      "head: letters: No such file or directory\n\n==> symbols <==\n*"
    );
    equal(
      head(mockedFS, { option: "n", count: 1, files: ["symbols", "letters"] }),
      "==> symbols <==\n*\n\nhead: letters: No such file or directory"
    );
  });
});

describe("tail", function() {
  it("should return empty string if count is zero", function() {
    equal(tail(mockedFS, { option: "c", count: "0", files: ["symbols"] }), "");
    equal(tail(mockedFS, { option: "n", count: "0", files: ["symbols"] }), "");
  });

  it("should throw error that count is invalid or non-numeric", function() {
    equal(
      tail(mockedFS, { option: "c", count: "1x", files: ["symbols"] }),
      "tail: illegal offset -- 1x"
    );
    equal(
      tail(mockedFS, { option: "n", count: "1x", files: ["symbols"] }),
      "tail: illegal offset -- 1x"
    );
  });

  it("should return given count of bytes of file from bottom if option is c", function() {
    equal(tail(mockedFS, { option: "c", count: 1, files: ["symbols"] }), "#");
    equal(tail(mockedFS, { option: "c", count: 2, files: ["symbols"] }), "\n#");
  });

  it("should return given count of lines of file from bottom if option is n", function() {
    equal(tail(mockedFS, { option: "n", count: 1, files: ["symbols"] }), "#");
    equal(
      tail(mockedFS, { option: "n", count: 2, files: ["symbols"] }),
      "$\n#"
    );
  });

  it("should return given count of bytes of all files from bottom seperated by file names if option is c", function() {
    equal(
      tail(mockedFS, { option: "c", count: 1, files: ["symbols", "symbols"] }),
      "==> symbols <==\n#\n\n==> symbols <==\n#"
    );
    equal(
      tail(mockedFS, { option: "c", count: 2, files: ["symbols", "symbols"] }),
      "==> symbols <==\n\n#\n\n==> symbols <==\n\n#"
    );
  });

  it("should return given count of lines of all files from bottom seperated by files names if option is n", function() {
    equal(
      tail(mockedFS, { option: "n", count: 1, files: ["symbols", "symbols"] }),
      "==> symbols <==\n#\n\n==> symbols <==\n#"
    );
    equal(
      tail(mockedFS, { option: "n", count: 2, files: ["symbols", "symbols"] }),
      "==> symbols <==\n$\n#\n\n==> symbols <==\n$\n#"
    );
  });

  it("should throw error if file is not present", function() {
    equal(
      tail(mockedFS, { option: "c", count: 1, files: ["letters"] }),
      "tail: letters: No such file or directory"
    );
    equal(
      tail(mockedFS, { option: "n", count: 2, files: ["letters"] }),
      "tail: letters: No such file or directory"
    );
  });

  it("should throw error for files those are not present and return given count of bytes of existing files from bottom", function() {
    equal(
      tail(mockedFS, { option: "c", count: 1, files: ["letters", "symbols"] }),
      "tail: letters: No such file or directory\n\n==> symbols <==\n#"
    );
    equal(
      tail(mockedFS, { option: "c", count: 1, files: ["symbols", "letters"] }),
      "==> symbols <==\n#\n\ntail: letters: No such file or directory"
    );
  });

  it("should throw error for files those are not present and return given count of lines of existing files from bottom", function() {
    equal(
      tail(mockedFS, { option: "n", count: 1, files: ["letters", "symbols"] }),
      "tail: letters: No such file or directory\n\n==> symbols <==\n#"
    );
    equal(
      tail(mockedFS, { option: "n", count: 1, files: ["symbols", "letters"] }),
      "==> symbols <==\n#\n\ntail: letters: No such file or directory"
    );
  });
});
