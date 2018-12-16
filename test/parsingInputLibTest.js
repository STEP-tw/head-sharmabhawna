const { equal, deepEqual } = require("assert");

const { extractOption, segregateInputs } = require("../src/parsingInputLib");

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
  });
});

describe("extractOption", function() {
  it("should return c if input starts with -c", function() {
    equal(extractOption("-c"), "c");
    equal(extractOption("-c5"), "c");
  });

  it("should return n if input does not start with -c", function() {
    equal(extractOption("-5"), "n");
    equal(extractOption("-n"), "n");
    equal(extractOption("-n5"), "n");
    equal(extractOption("file"), "n");
  });
});
