const { equal, deepEqual } = require("assert");

const { extractOption, segregateInputs, extractContent, head } = require("../src/lib.js");

describe("segregateInputs", function(){
  it("should return object containing n as defult option and 10 as defult count value", function(){
    deepEqual(segregateInputs(["file1"]), { option : "n", count : 10, files : ["file1"] } );
    deepEqual(segregateInputs(["file1", "file2"]), { option : "n", count : 10, files : ["file1", "file2"] } );
  });

  it("should return object containing n as defult option and given count", function(){
    deepEqual(segregateInputs(["-5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(segregateInputs(["-12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(segregateInputs(["-5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(segregateInputs(["-12", "file1", "file2"]), { option : "n", count : "12", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(segregateInputs(["-n5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(segregateInputs(["-n12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(segregateInputs(["-c5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(segregateInputs(["-c12", "file1"]), { option : "c", count : "12", files : ["file1"] } );
    deepEqual(segregateInputs(["-n5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(segregateInputs(["-c5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(segregateInputs(["-n", "5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(segregateInputs(["-n", "12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(segregateInputs(["-c", "5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(segregateInputs(["-c", "12", "file1"]), { option : "c", count : "12", files : ["file1"] } );
    deepEqual(segregateInputs(["-n", "5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(segregateInputs(["-c", "5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
  });
});

describe("extractOption", function(){
  it("should return c if input starts with -c", function(){
    equal(extractOption("-c"), "c");
    equal(extractOption("-c5"), "c");
  });

  it("should return n if input does not start with -c", function(){
    equal(extractOption("-5"), "n");
    equal(extractOption("-n"), "n");
    equal(extractOption("-n5"), "n");
    equal(extractOption("file"), "n");
  });
});

const areMatched = function(arg1, arg2) {
  return arg1 === arg2;
}

const reader = function(expectedFileName, encoding, content) {
  return function(actualFileName, encoding){
    if(areMatched(expectedFileName, actualFileName)){
      return content;
    }
  }
}

let file1Reader = reader("file1", "utf8", "a\nb\bc\nd\ne");
let file2Reader = reader("file2", "utf8", "1\n2\n3\n4\n5");

describe("extractContent", function(){
  it("should return given no of bytes of given file if option is c", function(){
    equal(extractContent(file1Reader, "c", "1", "file1"), "a");
    equal(extractContent(file2Reader, "c", "2", "file2"), "1\n");
  });

  it("should return given no of lines of given file if option is n", function(){
    equal(extractContent(file1Reader, "n", "1", "file1"), "a");
    equal(extractContent(file2Reader, "n", "2", "file2"), "1\n2");
  });
});

describe("head", function(){
  it("should throw error that count is zero", function(){
    equal(head(file1Reader, { option : "c", count : 0, files : ["file1"] }), "head: illegal byte count -- 0");
    equal(head(file2Reader, { option : "n", count : 0, files : ["file2"] }), "head: illegal line count -- 0");
  });

  it("should throw error that count is invalid or non-numeric", function(){
    equal(head(file1Reader, { option : "c", count : "1x", files : ["file1"] }), "head: illegal byte count -- 1x");
    equal(head(file2Reader, { option : "n", count : "1x", files : ["file2"] }), "head: illegal line count -- 1x");
  });

  it("should return given no of bytes of one file if option is c", function(){
    equal(head(file1Reader, { option : "c", count : 1, files : ["file1"] }), "a");
    equal(head(file2Reader, { option : "c", count : 2, files : ["file2"] }), "1\n");
  });

  it("should return given no of lines of one file if option is n", function(){
    equal(head(file1Reader, { option : "n", count : 1, files : ["file1"] }), "a");
    equal(head(file2Reader, { option : "n", count : 2, files : ["file2"] }), "1\n2");
  });

  it("should return given no of bytes of all files seperated by file names if option is c", function(){
    equal(head(file1Reader, { option : "c", count : 1, files : ["file1", "file1"] }), "==> file1 <==\na\n\n==> file1 <==\na");
    equal(head(file2Reader, { option : "c", count : 2, files : ["file2", "file2"] }), "==> file2 <==\n1\n\n\n==> file2 <==\n1\n");
  });
  
  it("should return given no of lines of all files seperated by file names if option is n", function(){
    equal(head(file1Reader, { option : "n", count : 1, files : ["file1", "file1"] }), "==> file1 <==\na\n\n==> file1 <==\na");
    equal(head(file2Reader, { option : "n", count : 2, files : ["file2", "file2"] }), "==> file2 <==\n1\n2\n\n==> file2 <==\n1\n2");
  });
});

