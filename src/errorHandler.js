const isInvalid = function (count) {
    return count == 0 || isNaN(count);
};

const countOffsetError = function (callingContext, option, count) {
    let offsetError = "tail: illegal offset -- ";
    let lineCountError = "head: illegal line count -- ";
    let byteCountError = "head: illegal byte count -- ";

    if (isInvalid(count)) {
        if (callingContext == "tail") {
            return count == 0 ? "" : offsetError + count;
        }
        return option == "n" ? lineCountError + count : byteCountError + count;
    }
}

const existanceError = function (callingContext, file) {
    return `${callingContext}: ${file}: No such file or directory`;
};

module.exports = { isInvalid, countOffsetError, existanceError };