const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters.";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters.";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Password field is required.";
  }

  if (!Validator.isLength(data.password2, { min: 8, max: 30 })) {
    errors.password2 = "Password must be between 8 and 30 characters.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
