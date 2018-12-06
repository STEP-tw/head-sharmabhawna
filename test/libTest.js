const { equal, deepEqual } = require("assert");

const { extractOption, varifyInputs, getContent, getHeadContent } = require("../src/lib.js");

describe("varifyInputs", function(){
  it("should return object containing n as defult option and 10 as defult count value", function(){
    deepEqual(varifyInputs(["file1"]), { option : "n", count : 10, files : ["file1"] } );
    deepEqual(varifyInputs(["file1", "file2"]), { option : "n", count : 10, files : ["file1", "file2"] } );
  });

  it("should return object containing n as defult option and given count", function(){
    deepEqual(varifyInputs(["-5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(varifyInputs(["-5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(varifyInputs(["-12", "file1", "file2"]), { option : "n", count : "12", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(varifyInputs(["-n5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-n12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(varifyInputs(["-c5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-c12", "file1"]), { option : "c", count : "12", files : ["file1"] } );
    deepEqual(varifyInputs(["-n5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(varifyInputs(["-c5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(varifyInputs(["-n", "5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-n", "12", "file1"]), { option : "n", count : "12", files : ["file1"] } );
    deepEqual(varifyInputs(["-c", "5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-c", "12", "file1"]), { option : "c", count : "12", files : ["file1"] } );
    deepEqual(varifyInputs(["-n", "5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(varifyInputs(["-c", "5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
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

describe("getContent", function(){
  it("should return given no of bytes of given file if option is c", function(){
    equal(getContent(reader, "c", "1", "file"), "T");
    equal(getContent(reader, "c", "2", "file"), "Th");
  });

  it("should return given no of lines of given file if option is n", function(){
    equal(getContent(reader, "n", "1", "file"), "This is first line.");
    equal(getContent(reader, "n", "2", "file"), "This is first line."+"\n"+"This is second line.");
  });
});

describe("getHeadContent", function(){
  it("should return given no of bytes of one file if option is c", function(){
    equal(getHeadContent(reader, "c", 1, ["file"]), "T");
    equal(getHeadContent(reader, "c", 2, ["file"]), "Th");
  });

  it("should return given no of lines of one file if option is n", function(){
    equal(getHeadContent(reader, "n", 1, ["file"]), "This is first line.");
    equal(getHeadContent(reader, "n", 2, ["file"]), "This is first line."+"\n"+"This is second line.");
  });

  it("should return given no of bytes of all files seperated by file names if option is c", function(){
    equal(getHeadContent(reader, "c", 1, ["file", "file"]), "==> file <==\nT\n\n==> file <==\nT");
    equal(getHeadContent(reader, "c", 2, ["file", "file"]), "==> file <==\nTh\n\n==> file <==\nTh");
  });
  
  it("should return given no of lines of all files seperated by file names if option is n", function(){
    equal(getHeadContent(reader, "n", 1, ["file", "file"]), "==> file <==\nThis is first line.\n\n==> file <==\nThis is first line.");
    equal(getHeadContent(reader, "n", 2, ["file", "file"]), "==> file <==\nThis is first line.\nThis is second line.\n\n==> file <==\nThis is first line.\nThis is second line.");
  });
});

