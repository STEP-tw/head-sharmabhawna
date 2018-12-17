const parse = function(usrInputs) {
  let result = { option: "n", count: 10, files: usrInputs };

  if (!usrInputs[0].startsWith("-")) {
    return result;
  }
  result.files = usrInputs.slice(1);
  result.count = usrInputs[0].slice(2);
  result.option = usrInputs[0].slice(1,2);

  if (!isNaN(usrInputs[0][1])) {
    result.count = usrInputs[0].slice(1);
    result.option = "n";
  }

  if (!isNaN(usrInputs[1])) {
    result.count = usrInputs[1];
    result.files = usrInputs.slice(2);
    result.option = usrInputs[0].slice(1)
  }
  return result;
};

module.exports = { parse };