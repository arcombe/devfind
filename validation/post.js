const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
  const errors = {};

  if (isEmpty(data.text)) {
    errors.text = "The post is empty, no point.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
