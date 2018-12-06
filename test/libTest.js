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

let file = "This is first line."+"\n"+"This is second line."+"\n"+"This is third line."

const reader = function(x, unicode) {
  return file;
}

describe("extractContent", function(){
  it("should return given no of bytes of given file if option is c", function(){
    equal(extractContent(reader, "c", "1", "file"), "T");
    equal(extractContent(reader, "c", "2", "file"), "Th");
  });

  it("should return given no of lines of given file if option is n", function(){
    equal(extractContent(reader, "n", "1", "file"), "This is first line.");
    equal(extractContent(reader, "n", "2", "file"), "This is first line."+"\n"+"This is second line.");
  });
});

describe("head", function(){
  it("should return given no of bytes of one file if option is c", function(){
    equal(head(reader, { option : "c", count : 1, files : ["file"] }), "T");
    equal(head(reader, { option : "c", count : 2, files : ["file"] }), "Th");
  });

  it("should return given no of lines of one file if option is n", function(){
    equal(head(reader, { option : "n", count : 1, files : ["file"] }), "This is first line.");
    equal(head(reader, { option : "n", count : 2, files : ["file"] }), "This is first line.\nThis is second line.");
  });

  it("should return given no of bytes of all files seperated by file names if option is c", function(){
    equal(head(reader, { option : "c", count : 1, files : ["file", "file"] }), "==> file <==\nT\n\n==> file <==\nT");
    equal(head(reader, { option : "c", count : 2, files : ["file", "file"] }), "==> file <==\nTh\n\n==> file <==\nTh");
  });
  
  it("should return given no of lines of all files seperated by file names if option is n", function(){
    equal(head(reader, { option : "n", count : 1, files : ["file", "file"] }), "==> file <==\nThis is first line.\n\n==> file <==\nThis is first line.");
    equal(head(reader, { option : "n", count : 2, files : ["file", "file"] }), "==> file <==\nThis is first line.\nThis is second line.\n\n==> file <==\nThis is first line.\nThis is second line.");
  });
});

