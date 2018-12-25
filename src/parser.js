const isOnlyOption = function (firstArg) {
  return firstArg.startsWith("-") && isNaN(firstArg[1]);
};

const isOnlyCount = function (firstArg) {
  return !isNaN(firstArg[1]);
};

const isOptionWithCount = function (firstArg) {
  return firstArg.startsWith("-") && firstArg.length > 2;
};

const createFormat = function (option, count, files) {
  return { option, count, files };
};

const parse = function (userInputs) {
  let firstArg = userInputs[0];
  let secondArg = userInputs[1];

  let option = "n";
  let count = 10;
  let files = userInputs.slice(0);

  if (isOnlyOption(firstArg)) {
    option = firstArg[1];
    count = secondArg;
    files = userInputs.slice(2);
  }

  if (isOptionWithCount(firstArg)) {
    option = firstArg[1];
    count = firstArg.slice(2);
    files = userInputs.slice(1);
  }

  if (isOnlyCount(firstArg)) {
    option = "n";
    count = firstArg.slice(1);
    files = userInputs.slice(1);
  }
  return createFormat(option, count, files);
};

module.exports = { parse };