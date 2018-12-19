const { equal } = require("assert");
const { isInvalid, throwError } = require("../src/errorHandler.js");

describe("isInvalid", function () {
    it("should return true when count is 0", function () {
        equal(isInvalid(0), true);
    });

    it("should return true when count is not a number", function () {
        equal(isInvalid("10x"), true);
    });

    it("should return false when count is number", function () {
        equal(isInvalid(10), false);
    });
});

describe("throwError", function () {
    describe("context: head", function () {
        describe("when option is n", function () {
            it("should return line count error when count is 0", function () {
                let expectedOutput = "head: illegal line count -- 0";
                equal(throwError("head", "n", 0), expectedOutput);
            });

            it("should return line count error when count is not a number", function () {
                let expectedOutput = "head: illegal line count -- 10x";
                equal(throwError("head", "n", "10x"), expectedOutput);
            });
        });

        describe("when option is c", function () {
            it("should return byte count error when count is 0", function () {
                let expectedOutput = "head: illegal byte count -- 0";
                equal(throwError("head", "c", 0), expectedOutput);
            });

            it("should return byte count error when count is not a number", function () {
                let expectedOutput = "head: illegal byte count -- 10x";
                equal(throwError("head", "c", "10x"), expectedOutput);
            });
        });
    });

    describe("context: tail", function () {
        describe("when option is n", function () {
            it("should return blank line when count is 0", function () {
                equal(throwError("tail", "n", 0), "");
            });

            it("should return offset error when count is not a number", function () {
                let expectedOutput = "tail: illegal offset -- 10x";
                equal(throwError("tail", "n", "10x"), expectedOutput);
            });
        });

        describe("when option is c", function () {
            it("should return blank line when count is 0", function () {
                equal(throwError("tail", "c", 0), "");
            });

            it("should return offset error when count is not a number", function () {
                let expectedOutput = "tail: illegal offset -- 10x";
                equal(throwError("tail", "c", "10x"), expectedOutput);
            });
        });
    });
});