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

const fs = { readFileSync : fileReader };

describe("extractContent", function(){
  it("should return given no of bytes of given numbers if option is c", function(){
    equal(extractContent(fs, "c", "1", "numbers"), "1");
    equal(extractContent(fs, "c", "2", "numbers"), "1\n");
  });

  it("should return given no of lines of given numbers if option is n", function(){
    equal(extractContent(fs, "n", "1", "numbers"), "1");
    equal(extractContent(fs, "n", "2", "numbers"), "1\n2");
  });
});

describe("head", function(){
  it("should throw error that count is zero", function(){
    equal(head(fs, { option : "c", count : 0, files : ["numbers"] }), "head: illegal byte count -- 0");
    equal(head(fs, { option : "n", count : 0, files : ["numbers"] }), "head: illegal line count -- 0");
  });

  it("should throw error that count is invalid or non-numeric", function(){
    equal(head(fs, { option : "c", count : "1x", files : ["numbers"] }), "head: illegal byte count -- 1x");
    equal(head(fs, { option : "n", count : "1x", files : ["numbers"] }), "head: illegal line count -- 1x");
  });

  it("should return given no of bytes of one numbers if option is c", function(){
    equal(head(fs, { option : "c", count : 1, files : ["numbers"] }), "1");
    equal(head(fs, { option : "c", count : 2, files : ["numbers"] }), "1\n");
  });

  it("should return given no of lines of one numbers if option is n", function(){
    equal(head(fs, { option : "n", count : 1, files : ["numbers"] }), "1");
    equal(head(fs, { option : "n", count : 2, files : ["numbers"] }), "1\n2");
  });

  it("should return given no of bytes of all numberss seperated by numbers names if option is c", function(){
    equal(head(fs, { option : "c", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n==> numbers <==\n1");
    equal(head(fs, { option : "c", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n\n==> numbers <==\n1\n");
  });
  
  it("should return given no of lines of all numberss seperated by numbers names if option is n", function(){
    equal(head(fs, { option : "n", count : 1, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n\n==> numbers <==\n1");
    equal(head(fs, { option : "n", count : 2, files : ["numbers", "numbers"] }), "==> numbers <==\n1\n2\n\n==> numbers <==\n1\n2");
  });

});
