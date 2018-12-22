const { deepEqual } = require("assert");
const { take, last, zip } = require("../src/util.js");

describe("take", function () {
    it("should return empty array when empty array is given", function () {
        deepEqual(take([], 2), []);
    });

    it("should return first n elements of array when n is less than array length", function () {
        deepEqual(take(["*", "@", "%", "$", "#"], 2), ["*", "@"]);
    });

    it("should return all elements when n is equal to than array length", function () {
        deepEqual(take(["*", "@", "%", "$", "#"], 5), ["*", "@", "%", "$", "#"]);
    });

    it("should return all elements when n is greater than array length", function () {
        deepEqual(take(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
    });
});

describe("last", function () {
    it("should return empty array when empty array is given", function () {
        deepEqual(last([], 2), []);
    });

    it("should return last n elements of array if n is less than array length", function () {
        deepEqual(last(["*", "@", "%", "$", "#"], 2), ["$", "#"]);
    });

    it("should return all elements when n is equal to than array length", function () {
        deepEqual(last(["*", "@", "%", "$", "#"], 5), ["*", "@", "%", "$", "#"]);
    });

    it("should return all elements when n is greater than array length", function () {
        deepEqual(last(["*", "@", "%", "$", "#"], 10), ["*", "@", "%", "$", "#"]);
    });
});

describe("zip", function () {
    it("should return empty array if both arrays are empty", function () {
        deepEqual(zip([], []), []);
    });
    it("should return array of zipped elements of both arrays", function () {
        deepEqual(zip([1, 2], [3, 4]), [[1, 3], [2, 4]]);
    });
});