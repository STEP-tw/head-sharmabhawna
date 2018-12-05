const { equal, deepEqual } = require("assert");

const { split, varifyInputs } = require("../src/lib.js");

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
