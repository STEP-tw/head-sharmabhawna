const hasNoOption = function (firstArg) {
  return !isNaN(firstArg[1]);
};

const hasOptionWithcount = function (firstArg) {
  return !isNaN(firstArg[2]);
};

const hasOptionWithoutcount = function (secondArg) {
  return !isNaN(secondArg);
};

const getDefaultOptionAndCount = function (userInputs) {
  return { option: "n", count: 10, files: userInputs };
};

const getDefaultOption = function (userInputs) {
  return { option: "n", count: userInputs[0].slice(1), files: userInputs.slice(1) };
};

const pasreOptionWithCount = function (userInputs) {
  return { option: userInputs[0].slice(1, 2), count: userInputs[0].slice(2), files: userInputs.slice(1) };
};

const pasreOptionWithoutCount = function (userInputs) {
  return { option: userInputs[0].slice(1), count: userInputs[1], files: userInputs.slice(2) };
};

const parse = function (userInputs) {
  let firstArg = userInputs[0];
  let secondArg = userInputs[1];

  if (hasNoOption(firstArg)) {
    return getDefaultOption(userInputs);
  }

  if (hasOptionWithcount(firstArg)) {
    return pasreOptionWithCount(userInputs);
  }

  if (hasOptionWithoutcount(secondArg)) {
    return pasreOptionWithoutCount(userInputs);
  }
  return getDefaultOptionAndCount(userInputs);

};

module.exports = { parse };