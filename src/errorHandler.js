const isInvalid = function (count) {
    return count == 0 || isNaN(count);
};

const throwError = function (callingContext, option, count) {
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

module.exports = { isInvalid, throwError };