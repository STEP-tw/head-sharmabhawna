const generateHeader = function (fileName) {
    return "==> " + fileName + " <==";
};

const addHeader = function (fileName, content) {
    return generateHeader(fileName) + "\n" + content;
};

const formatContent = function (fileName, content) {
    if (content.match(/No such file or directory/)) {
        return content;
    }
    return addHeader(fileName, content);
};

module.exports = { generateHeader, addHeader, formatContent };