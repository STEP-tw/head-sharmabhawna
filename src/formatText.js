const generateHeader = function (fileName) {
    return "==> " + fileName + " <==";
};

const addHeader = function (fileName, text) {
    if (text.match(/: No such file or directory/)) {
        return text;
    }
    return generateHeader(fileName) + "\n" + text;
};

module.exports = { generateHeader, addHeader };