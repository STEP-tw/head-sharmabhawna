const isInvalid = function (count) {
    return count == 0 || isNaN(count);
};

const isIllegal = function (option) {
    return option != "c" && option != "n";
};

const countOffsetError = function (callingContext, option, count) {
    let offsetError = "tail: illegal offset -- ";
    let lineCountError = "head: illegal line count -- ";
    let byteCountError = "head: illegal byte count -- ";

    if (callingContext == "tail") {
        return count == 0 ? "" : offsetError + count;
    }
    return option == "n" ? lineCountError + count : byteCountError + count;
}

const illegalOptionError = function (callingContext, option) {
    let headUsageMsg = "usage: head [-n lines | -c bytes] [file ...]";
    let tailUsageMsg = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    let errorMsg = `${callingContext}: illegal option -- ${option}`;
    let headErrorMsg = errorMsg + "\n" + headUsageMsg;
    let tailErrorMsg = errorMsg + "\n" + tailUsageMsg;

    return (callingContext == "head") ? headErrorMsg : tailErrorMsg;
};

const existanceError = function (callingContext, file) {
    return `${callingContext}: ${file}: No such file or directory`;
};

module.exports = { isInvalid, countOffsetError, existanceError, isIllegal, illegalOptionError };