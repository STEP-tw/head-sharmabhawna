const { equal, deepEqual } = require("assert");

const { extractContent, extractHeadContent, extractTailContent, head, tail } = require("../src/lib.js");

const areMatched = function(arg1, arg2) {
  return arg1 === arg2;
}

const mockedReader = function(expectedFileName, encoding, content) {
  return function(actualFileName, encoding){
    if(areMatched(expectedFileName, actualFileName)){
      return content;
    }
  }
}

const mockedExistanceChecker = function(expectedFileName, content) {
  return function(actualFileName){
    return areMatched(expectedFileName, actualFileName);
  }
}

const fileReader = mockedReader("numbers", "utf8", "1\n2\n3\n4\n5");

const fileValidator = mockedExistanceChecker("numbers", "1\n2\n3\n4\n5");

const mockedFS = { readFileSync : fileReader, existsSync : fileValidator };

describe("extractContent", function(){
  it("should return full content of file", function(){
    equal(extractContent(mockedFS, "numbers"), "1\n2\n3\n4\n5");
  });
});

describe("extractHeadContent", function(){
  it("should return given no of bytes of file from top if option is c", function(){
    equal(extractHeadContent(mockedFS, "c", "1", "numbers"), "1");
    equal(extractHeadContent(mockedFS, "c", "2", "numbers"), "1\n");
  });

  it("should return given no of lines of file from top if option is n", function(){
    equal(extractHeadContent(mockedFS, "n", "1", "numbers"), "1");
    equal(extractHeadContent(mockedFS, "n", "2", "numbers"), "1\n2");
  });

});

describe("extractTailContent", function(){
  it("should return given no of bytes of file from bottom if option is c", function(){
    equal(extractTailContent(mockedFS, "c", "1", "numbers"), "5");
    equal(extractTailContent(mockedFS, "c", "2", "numbers"), "\n5");
  });

  it("should return given no of lines of file from bottom if option is n", function(){
    equal(extractTailContent(mockedFS, "n", "1", "numbers"), "5");
    equal(extractTailContent(mockedFS, "n", "2", "numbers"), "4\n5");
  });

});

describe("head", function(){
  it("should throw error that count is zero", function(){
    equal(head(mockedFS, { option : "c", count : 0, files : ["numbers"] }), "head: illegal byte count -- 0");
    equal(head(mockedFS, { option : "n", count : 0, files : ["numbers"] }), "head: illegal line count -- 0");
  });

  it("should throw error that count is invalid or non-numeric", function(){
    equal(head(mockedFS, { option : "c", count : "1x", files : ["numbers"] }), "head: illegal byte count -- 1x");
    equal(head(mockedFS, { option : "n", count : "1x", files : ["numbers"] }), "head: illegal line count -- 1x");
  });

  it("should return given no of bytes of file from top if option is c", function(){
    equal(head(mockedFS, { option : "c", count : 1, files : ["numbers"] }), "1");
    equal(head(mockedFS, { option : "c", count : 2, files : ["numbers"] }), "1\n");
  });

  it("should return given no of lines of file from top if option is n", function(){
    equal(head(mockedFS, { option : "n", count : 1, files : ["numbers"] }), "1");
    equal(head(mockedFS, { option : "n", count : 2, files : ["numbers"] }), "1\n2");
  });

  it("should return given no of bytes of all files from top seperated by file names if option is c", function(){
    equal(head(mockedFS, { option : "c", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n==> numbers <==\n1");
    equal(head(mockedFS, { option : "c", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n\n==> numbers <==\n1\n");
  });
  
  it("should return given no of lines of all files from top seperated by file names if option is n", function(){
    equal(head(mockedFS, { option : "n", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n==> numbers <==\n1");
    equal(head(mockedFS, { option : "n", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n2\n\n==> numbers <==\n1\n2");
  });

  it("should throw error if file is not present", function(){
    equal(head(mockedFS, { option : "c", count : 1, files : ["letters"] }), "head: letters: No such file or directory");
    equal(head(mockedFS, { option : "n", count : 2, files : ["letters"] }), "head: letters: No such file or directory");
  });

});

describe("tail", function(){
  it("should throw error that count is invalid or non-numeric", function(){
    equal(tail(mockedFS, { option : "c", count : "1x", files : ["numbers"] }), "tail: illegal offset -- 1x");
    equal(tail(mockedFS, { option : "n", count : "1x", files : ["numbers"] }), "tail: illegal offset -- 1x");
  });

  it("should return given no of bytes of file from bottom if option is c", function(){
    equal(tail(mockedFS, { option : "c", count : 1, files : ["numbers"] }), "5");
    equal(tail(mockedFS, { option : "c", count : 2, files : ["numbers"] }), "\n5");
  });

  it("should return given no of lines of file from bottom if option is n", function(){
    equal(tail(mockedFS, { option : "n", count : 1, files : ["numbers"] }), "5");
    equal(tail(mockedFS, { option : "n", count : 2, files : ["numbers"] }), "4\n5");
  });

  it("should return given no of bytes of all files from bottom seperated by file names if option is c", function(){
    equal(tail(mockedFS, { option : "c", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n5\n\n==> numbers <==\n5");
    equal(tail(mockedFS, { option : "c", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n\n5\n\n==> numbers <==\n\n5");
  });
  
  it("should return given no of lines of all files from bottom seperated by files names if option is n", function(){
    equal(tail(mockedFS, { option : "n", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n5\n\n==> numbers <==\n5");
    equal(tail(mockedFS, { option : "n", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n4\n5\n\n==> numbers <==\n4\n5");
  });

  it("should throw error if file is not present", function(){
    equal(tail(mockedFS, { option : "c", count : 1, files : ["letters"] }), "tail: letters: No such file or directory");
    equal(tail(mockedFS, { option : "n", count : 2, files : ["letters"] }), "tail: letters: No such file or directory");
  });

});