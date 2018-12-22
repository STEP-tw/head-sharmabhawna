const take = function (contents, count) {
    return contents.slice(0, count);
};

const last = function (contents, count) {
    return contents.slice(-count);
};

const zip = function (list1, list2) {
    let result = [];
    for (let index = 0; index < list1.length; index++) {
        result.push([list1[index], list2[index]]);
    }
    return result
};

module.exports = { take, last, zip };