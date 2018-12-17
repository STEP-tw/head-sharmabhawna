const { deepEqual } = require("assert");

const { parse } = require("../src/parser.js");

describe("parse", function () {
  it("should return object with n as defult option and 10 as defult count value for single file", function () {
    let expectedOutput = { option: "n", count: 10, files: ["file1"] };
    deepEqual(parse(["file1"]), expectedOutput);
  });

  it("should return object with n as defult option and 10 as defult count value for multiple files", function () {
    let expectedOutput = { option: "n", count: 10, files: ["file1", "file2"] };
    deepEqual(parse(["file1", "file2"]), expectedOutput);
  });

  it("should return object with n as defult option when count is given for single file", function () {
    let expectedOutput = { option: "n", count: "12", files: ["file1"] };
    deepEqual(parse(["-12", "file1"]), expectedOutput);
  });

  it("should return object with n as defult option when count is given for multiple files", function () {
    let expectedOutput = { option: "n", count: "12", files: ["file1", "file2"] };
    deepEqual(parse(["-12", "file1", "file2"]), expectedOutput);
  });

  it("should return object with given option and count for single file when specified combined", function () {
    let expectedOutput = { option: "n", count: "12", files: ["file1"] };
    deepEqual(parse(["-n12", "file1"]), expectedOutput);
  });

  it("should return object with given option and count for mutiple file when specified combined ", function () {
    let expectedOutput = { option: "c", count: "12", files: ["file1", "file2"] };
    deepEqual(parse(["-c12", "file1", "file2"]), expectedOutput);
  });

  it("should return object with given option and count for single file when specified seperately", function () {
    let expectedOutput = { option: "n", count: "12", files: ["file1"] };
    deepEqual(parse(["-n", "12", "file1"]), expectedOutput);
  });

  it("should return object with given option and count for multiple file when specified seperately", function () {
    let expectedOutput = { option: "c", count: "12", files: ["file1", "file2"] };
    deepEqual(parse(["-c", "12", "file1", "file2"]), expectedOutput);
  });

});