const { equal } = require("assert");
const { generateHeader, addHeader, formatContent, formatData } = require("../src/format.js");

describe("generateHeader", function () {
    it("should return header of given file name", function () {
        equal(generateHeader("symbols"), "==> symbols <==");
    });
});

describe("addHeader", function () {
    it("should return content with file name as header", function () {
        let expectedOutput = "==> symbols <==\n$\n%";
        equal(addHeader("symbols", "$\n%"), expectedOutput);
    });
});

describe("formatContent", function () {
    it("should return text without header when text is existance error", function () {
        let text = "head: letters: No such file or directory";
        let expectedOutput = "head: letters: No such file or directory";
        equal(formatContent("letters", text), expectedOutput);
    });

    it("should return text with file name as header", function () {
        let text = "$\n%";
        let expectedOutput = "==> symbols <==\n$\n%";
        equal(formatContent("symbols", text), expectedOutput);
    });
});

describe("formatData", function () {
    it("should return content of file without header if only one file is given", function () {
        equal(formatData([["vowels", "a\ne"]]), "a\ne");
    });
    it("should return content of files seperated by their names as header", function () {
        let filesDetail = [["vowels", "a\ne"], ["letters", "head: letters: No such file or directory"], ["numbers", ""]];
        let expectedOutput = "==> vowels <==\na\ne\nhead: letters: No such file or directory\n==> numbers <==\n";
        equal(formatData(filesDetail), expectedOutput);
    });
});