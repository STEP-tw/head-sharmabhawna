const onlyFilesSpecified = function (firstArg) {
  return !firstArg.startsWith("-");
};
const hasNoOption = function (firstArg) {
  return !isNaN(firstArg[1]);
};

const hasOptionWithcount = function (firstArg) {
  return firstArg.length > 2;
};

const createFormat = function (option, count, files) {
  return { option, count, files };
};
const parse = function (userInputs) {
  let firstArg = userInputs[0];
  let secondArg = userInputs[1];
  let option = "n";
  let count = 10;
  let files = userInputs;

  if (onlyFilesSpecified(firstArg)) {
    return createFormat(option, count, files);
  }
  files = userInputs.slice(1);

  if (hasNoOption(firstArg)) {
    let count = firstArg.slice(1);
    return createFormat(option, count, files);
  }

  if (hasOptionWithcount(firstArg)) {
    let option = firstArg.slice(1, 2);
    let count = firstArg.slice(2);
    return createFormat(option, count, files);
  }
  option = firstArg.slice(1);
  count = secondArg;
  files = userInputs.slice(2);

  return createFormat(option, count, files);
};

module.exports = { parse };