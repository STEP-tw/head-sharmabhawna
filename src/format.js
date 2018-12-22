const generateHeader = function (fileName) {
    return "==> " + fileName + " <==";
};

const addHeader = function (fileName, content) {
    return generateHeader(fileName) + "\n" + content;
};

const formatContent = function ([fileName, content]) {
    if (content.match(/No such file or directory/)) {
        return content;
    }
    return addHeader(fileName, content);
};

const formatData = function (filesDetail) {
    if (filesDetail.length == 1) {
        let firstFileContent = filesDetail[0][1];
        return firstFileContent;
    }
    return filesDetail.map(formatContent).join("\n");
};

module.exports = { generateHeader, addHeader, formatContent, formatData };