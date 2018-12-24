const { equal } = require("assert");
const { generateHeader, addHeader, singleFileFormater, formatContent, formatData } = require("../src/format.js");

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

describe("singleFileFormater", function () {
    it("should return content of file for existing file", function () {
        let fileDetail = { "fileName": "vowels", "exists": true, "content": "a\ne" };
        equal(singleFileFormater("haed", fileDetail), "a\ne");
    });

    it("should return existance error for non-existing file", function () {
        let fileDetail = { "fileName": "letters", "exists": false, "content": "" };
        let expectedOutput = "head: letters: No such file or directory";
        equal(singleFileFormater("head", fileDetail), expectedOutput);
    });

});

describe("formatContent", function () {
    it("should return existance error when file does not exist", function () {
        let fileDetail = { "fileName": "letters", "exists": false, "content": "" };
        let expectedOutput = "head: letters: No such file or directory";
        equal(formatContent("head", fileDetail), expectedOutput);
    });

    it("should return content of file followed by file name header when file exists", function () {
        let fileDetail = { "fileName": "symbols", "exists": true, "content": "$\n&" };
        let expectedOutput = "==> symbols <==\n$\n&"
        equal(formatContent("head", fileDetail), expectedOutput);
    });
});

describe("formatData", function () {
    it("should return content of file for existing file when only one file is given", function () {
        let fileDetail = [{ "fileName": "vowels", "exists": true, "content": "a\ne" }];
        equal(formatData("haed", fileDetail), "a\ne");
    });

    it("should return existance error for non-existing file when one file is given", function () {
        let fileDetail = [{ "fileName": "letters", "exists": false, "content": "" }];
        let expectedOutput = "head: letters: No such file or directory";
        equal(formatData("head", fileDetail), expectedOutput);
    });

    it("should return existance error for non-exixting files and content of files followed by header for existing files", function () {
        let filesDetail = [{ "fileName": "vowels", "exists": true, "content": "a\ne" }];
        filesDetail.push({ "fileName": "letters", "exists": false, "content": "" });
        filesDetail.push({ "fileName": "symbols", "exists": true, "content": "%\n$" });
        let expectedOutput = "==> vowels <==\na\ne\nhead: letters: No such file or directory\n==> symbols <==\n%\n$";
        equal(formatData("head", filesDetail), expectedOutput);
    });

});