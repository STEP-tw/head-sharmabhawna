const segregateInputs = function(inputs) {
  let result = { option: "n", count: 10, files: inputs };
  result.option = extractOption(inputs[0]);

  if (!inputs[0].startsWith("-")) {
    return result;
  }
  result.files = inputs.slice(1);
  result.count = inputs[0].slice(2);

  if (!isNaN(inputs[0][1])) {
    result.count = inputs[0].slice(1);
  }

  if (!isNaN(inputs[1])) {
    result.count = inputs[1];
    result.files = inputs.slice(2);
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
