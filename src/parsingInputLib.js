const segregateInputs = function(usrInputs) {
  let result = { option: "n", count: 10, files: usrInputs };
  result.option = extractOption(usrInputs[0]);

  if (!usrInputs[0].startsWith("-")) {
    return result;
  }
  result.files = usrInputs.slice(1);
  result.count = usrInputs[0].slice(2);

  if (!isNaN(usrInputs[0][1])) {
    result.count = usrInputs[0].slice(1);
  }

  if (!isNaN(usrInputs[1])) {
    result.count = usrInputs[1];
    result.files = usrInputs.slice(2);
  }
  return result;
};

const extractOption = function(input) {
  if (input.startsWith("-c")) {
    return "c";
  }
  return "n";
};

module.exports = { segregateInputs, extractOption };
