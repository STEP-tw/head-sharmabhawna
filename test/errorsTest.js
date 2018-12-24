const { equal } = require("assert");
const { isInvalid, countOffsetError, existanceError, isIllegal, illegalOptionError } = require("../src/errors.js");

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

describe("countOffsetError", function () {
    describe("context: head", function () {
        describe("when option is n", function () {
            it("should return line count error when count is 0", function () {
                let expectedOutput = "head: illegal line count -- 0";
                equal(countOffsetError("head", "n", 0), expectedOutput);
            });

            it("should return line count error when count is not a number", function () {
                let expectedOutput = "head: illegal line count -- 10x";
                equal(countOffsetError("head", "n", "10x"), expectedOutput);
            });
        });

        describe("when option is c", function () {
            it("should return byte count error when count is 0", function () {
                let expectedOutput = "head: illegal byte count -- 0";
                equal(countOffsetError("head", "c", 0), expectedOutput);
            });

            it("should return byte count error when count is not a number", function () {
                let expectedOutput = "head: illegal byte count -- 10x";
                equal(countOffsetError("head", "c", "10x"), expectedOutput);
            });
        });
    });

    describe("context: tail", function () {
        describe("when option is n", function () {
            it("should return empty string when count is 0", function () {
                equal(countOffsetError("tail", "n", 0), "");
            });

            it("should return offset error when count is not a number", function () {
                let expectedOutput = "tail: illegal offset -- 10x";
                equal(countOffsetError("tail", "n", "10x"), expectedOutput);
            });
        });

        describe("when option is c", function () {
            it("should return empty string when count is 0", function () {
                equal(countOffsetError("tail", "c", 0), "");
            });

            it("should return offset error when count is not a number", function () {
                let expectedOutput = "tail: illegal offset -- 10x";
                equal(countOffsetError("tail", "c", "10x"), expectedOutput);
            });
        });
    });
});

describe("existanceError", function () {
    it("should return existance error of file for head", function () {
        let expectedOutput = "head: letters: No such file or directory";
        equal(existanceError("head", "letters"), expectedOutput);
    });

    it("should return existance error of file for tail", function () {
        let expectedOutput = "tail: characters: No such file or directory";
        equal(existanceError("tail", "characters"), expectedOutput);
    });
});

describe("isIllegal", function () {
    it("should return true if option is neither n nor c", function () {
        equal(isIllegal("p"), true);
        equal(isIllegal("x"), true);
    });

    it("should return false if option is either n or c", function () {
        equal(isIllegal("n"), false);
        equal(isIllegal("c"), false);
    });
});

describe("illegalOptionError", function () {
    it("should return head's illegal option error when callingContext is head for illegal option", function () {
        let expectedOutput = "head: illegal option -- p\n";
        expectedOutput += "usage: head [-n lines | -c bytes] [file ...]";
        equal(illegalOptionError("head", "p"), expectedOutput);
    });

    it("should return tail's illegal option error when callingContext is tail for illegal option", function () {
        let expectedOutput = "tail: illegal option -- p\n";
        expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        equal(illegalOptionError("tail", "p"), expectedOutput);
    });

});