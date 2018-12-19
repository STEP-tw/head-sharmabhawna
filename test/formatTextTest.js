const { equal } = require("assert");
const { generateHeader } = require("../src/formatText.js");

describe("generateHeader", function () {
    it("should return header of given file name", function () {
        equal(generateHeader("symbols"), "==> symbols <==");
    });
});