const { deepEqual } = require("assert");

const { segregateInputs } = require("../src/parseInputs.js");

describe("segregateInputs", function() {
  it("should return object containing n as defult option and 10 as defult count value", function() {
    deepEqual(segregateInputs(["file1"]), {
      option: "n",
      count: 10,
      files: ["file1"]
    });
    deepEqual(segregateInputs(["file1", "file2"]), {
      option: "n",
      count: 10,
      files: ["file1", "file2"]
    });
  });

  it("should return object containing n as defult option and given count", function() {
    deepEqual(segregateInputs(["-5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-12", "file1", "file2"]), {
      option: "n",
      count: "12",
      files: ["file1", "file2"]
    });
  });

  it("should return object with given option and count when they are given jointly", function() {
    deepEqual(segregateInputs(["-n5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-n12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-c5", "file1"]), {
      option: "c",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-c12", "file1"]), {
      option: "c",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-p5", "file1"]), {
      option: "p",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-p12", "file1"]), {
      option: "p",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-n5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-c5", "file1", "file2"]), {
      option: "c",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-p5", "file1", "file2"]), {
      option: "p",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-p12", "file1", "file2"]), {
      option: "p",
      count: "12",
      files: ["file1", "file2"]
    });
  });

  it("should return object with given option and count when they are given seperately", function() {
    deepEqual(segregateInputs(["-n", "5", "file1"]), {
      option: "n",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-n", "12", "file1"]), {
      option: "n",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-c", "5", "file1"]), {
      option: "c",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-c", "12", "file1"]), {
      option: "c",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-p", "5", "file1"]), {
      option: "p",
      count: "5",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-p", "12", "file1"]), {
      option: "p",
      count: "12",
      files: ["file1"]
    });
    deepEqual(segregateInputs(["-n", "5", "file1", "file2"]), {
      option: "n",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-c", "5", "file1", "file2"]), {
      option: "c",
      count: "5",
      files: ["file1", "file2"]
    });
    deepEqual(segregateInputs(["-p", "5", "file1", "file2"]), {
      option: "p",
      count: "5",
      files: ["file1", "file2"]
    });
  });
});