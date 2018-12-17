const { deepEqual } = require("assert");

const { parse } = require("../src/parseInputs.js");

describe("parse", function() {
  it("should return object containing n as defult option and 10 as defult count value", function() {
    deepEqual(parse(["file1"]), {
      option: "n",
      count: 10,
      files: ["file1"]
    });
    deepEqual(parse(["file1", "file2"]), {
      option: "n",
      count: 10,
      files: ["file1", "file2"]
    });
  });

  it("should return object containing n as defult option and given count", function() {
    deepEqual(parse(["-5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-12", "file1", "file2"]), {
      option: "n",
      count: "12",
      files: ["file1", "file2"]
    });
  });

  it("should return object with given option and count when they are given jointly", function() {
    deepEqual(parse(["-n5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-n12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-c5", "file1"]), {
      option: "c",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-c12", "file1"]), {
      option: "c",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-p5", "file1"]), {
      option: "p",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-p12", "file1"]), {
      option: "p",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-n5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-c5", "file1", "file2"]), {
      option: "c",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-p5", "file1", "file2"]), {
      option: "p",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-p12", "file1", "file2"]), {
      option: "p",
      count: "12",
      files: ["file1", "file2"]
    });
  });

  it("should return object with given option and count when they are given seperately", function() {
    deepEqual(parse(["-n", "5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-n", "12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-c", "5", "file1"]), {
      option: "c",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-c", "12", "file1"]), {
      option: "c",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-p", "5", "file1"]), {
      option: "p",
      count: "5",
      files: ["file1"]
    });
    deepEqual(parse(["-p", "12", "file1"]), {
      option: "p",
      count: "12",
      files: ["file1"]
    });
    deepEqual(parse(["-n", "5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-c", "5", "file1", "file2"]), {
      option: "c",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(parse(["-p", "5", "file1", "file2"]), {
      option: "p",
      count: "5",
      files: ["file1", "file2"]
    });
  });
});