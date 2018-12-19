const take = function (contents, count) {
    return contents.slice(0, count);
};

const last = function (contents, count) {
    return contents.slice(-count);
};

module.exports = { take, last };