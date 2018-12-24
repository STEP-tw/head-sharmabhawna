const { existanceError } = require("./errors.js");

const generateHeader = function (fileName) {
    return "==> " + fileName + " <==";
};

const addHeader = function (fileName, content) {
    return generateHeader(fileName) + "\n" + content;
};

const singleFileFormater = function (callingContext, { fileName, exists, content }) {
    if (exists) {
        return content;
    }
    return existanceError(callingContext, fileName)
};

const formatContent = function (callingContext, { fileName, exists, content }) {
    if (!exists) {
        return existanceError(callingContext, fileName);
    }
    return addHeader(fileName, content);
};

const formatData = function (callingContext, filesDetail) {
    let formater = formatContent.bind("null", callingContext);
    if (filesDetail.length == 1) {
        return singleFileFormater(callingContext, filesDetail[0]);
    }
    return filesDetail.map(formater).join("\n");
};

module.exports = { generateHeader, addHeader, singleFileFormater, formatContent, formatData };