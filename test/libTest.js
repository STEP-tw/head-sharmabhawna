const { equal, deepEqual } = require("assert");

const { split, varifyInputs } = require("../src/lib.js");

describe("split", function(){
  it("should return empty array when data and splitor both are empty strings", function(){
    deepEqual(split("", ""), []);
  });

  it("should return array containing given string when splitor is not provided", function(){
    deepEqual(split(""), [""]);
    deepEqual(split("b"), ["b"]);
  });

  it("should return array containing splitted string wrt to given splitor  ", function(){
    deepEqual(split("b", "b"), ["",""]);
    deepEqual(split("ba", "a"), ["b",""]);
    deepEqual(split("ba", "b"), ["","a"]);
  });
});

describe("varifyInputs", function(){
  it("should return object containing n as defult option and 10 as defult count value", function(){
    deepEqual(varifyInputs(["file1"]), { option : "n", count : 10, files : ["file1"] } );
    deepEqual(varifyInputs(["file1", "file2"]), { option : "n", count : 10, files : ["file1", "file2"] } );
  });

  it("should return object containing n as defult option and given count", function(){
    deepEqual(varifyInputs(["-5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(varifyInputs(["-n5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-c5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-n5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(varifyInputs(["-c5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
  });

  it("should return object with given option and count", function(){
    deepEqual(varifyInputs(["-n", "5", "file1"]), { option : "n", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-c", "5", "file1"]), { option : "c", count : "5", files : ["file1"] } );
    deepEqual(varifyInputs(["-n", "5", "file1", "file2"]), { option : "n", count : "5", files : ["file1", "file2"] } );
    deepEqual(varifyInputs(["-c", "5", "file1", "file2"]), { option : "c", count : "5", files : ["file1", "file2"] } );
  });

});
