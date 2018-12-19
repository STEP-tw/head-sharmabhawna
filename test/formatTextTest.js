const { equal } = require("assert");
const { generateHeader, addHeader } = require("../src/formatText.js");

describe("generateHeader", function () {
    it("should return header of given file name", function () {
        equal(generateHeader("symbols"), "==> symbols <==");
    });
});

describe("addHeader", function () {
    it("should return text without header when text is existance error", function () {
        let text = "head: letters: No such file or directory";
        let expectedOutput = "head: letters: No such file or directory";
        equal(addHeader("letters", text), expectedOutput);
    });

    it("should return text with file name as header", function () {
        let text = "$\n%";
        let expectedOutput = "==> symbols <==\n$\n%";
        equal(addHeader("symbols", text), expectedOutput);
    });
});