const { equal, deepEqual } = require("assert");

const { split } = require("../src/lib.js");

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
