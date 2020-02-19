const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
