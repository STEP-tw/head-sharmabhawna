const { deepEqual } = require("assert");

const { parse } = require("../src/parser.js");

describe("parse", function () {
  describe("for single file", function () {
    it("should parse input with deafult option, count and false arg error", function () {
      let expectedOutput = { option: "n", count: 10, files: ["file1"], "argError": false };
      deepEqual(parse(["file1"]), expectedOutput);
    });

    it("should parse input with defult option, specified count and false arg error", function () {
      let expectedOutput = { option: "n", count: "12", files: ["file1"], "argError": false };
      deepEqual(parse(["-12", "file1"]), expectedOutput);
    });

    it("should parse input with defult option, specified count and true arg error when count is invalid", function () {
      let expectedOutput = { option: "n", count: "12x", files: ["file1"], "argError": true };
      deepEqual(parse(["-12x", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and false arg error when option and count are joint", function () {
      let expectedOutput = { option: "n", count: "12", files: ["file1"], "argError": false };
      deepEqual(parse(["-n12", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and true arg error when option and count are joint and count is invalid", function () {
      let expectedOutput = { option: "n", count: "12x", files: ["file1"], "argError": true };
      deepEqual(parse(["-n12x", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and true arg error when option and count are joint and option is illegal", function () {
      let expectedOutput = { option: "p", count: "12", files: ["file1"], "argError": true };
      deepEqual(parse(["-p12", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and false arg error when both are seperate", function () {
      let expectedOutput = { option: "n", count: "12", files: ["file1"], "argError": false };
      deepEqual(parse(["-n", "12", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and true arg error when both are seperate and count is invalid", function () {
      let expectedOutput = { option: "n", count: "12x", files: ["file1"], "argError": true };
      deepEqual(parse(["-n", "12x", "file1"]), expectedOutput);
    });

    it("should parse input with specified option and count and true arg error when both are seperate and option is illegal", function () {
      let expectedOutput = { option: "p", count: "12", files: ["file1"], "argError": true };
      deepEqual(parse(["-p", "12", "file1"]), expectedOutput);
    });
  });

  describe("for multiple files", function () {
    it("should parse input with deafult option, count and false arg error", function () {
      let expectedOutput = { option: "n", count: 10, files: ["file1", "file2"], "argError": false };
      deepEqual(parse(["file1", "file2"]), expectedOutput);
    });

    it("should parse input with defult option, specified count and false arg error", function () {
      let expectedOutput = { option: "n", count: "12", files: ["file1", "file2"], "argError": false };
      deepEqual(parse(["-12", "file1", "file2"]), expectedOutput);
    });

    it("should parse input with specified option and count and false arg error when option and count are joint", function () {
      let expectedOutput = { option: "c", count: "12", files: ["file1", "file2"], "argError": false };
      deepEqual(parse(["-c12", "file1", "file2"]), expectedOutput);
    });

    it("should parse input with specified option and count and false arg error when option and count are joint", function () {
      let expectedOutput = { option: "c", count: "12", files: ["file1", "file2"], "argError": false };
      deepEqual(parse(["-c", "12", "file1", "file2"]), expectedOutput);
    });
  });
});