const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateEducationInput = data => {
  let errors = {};

  if (isEmpty(data.school)) {
    errors.school = "Email field is required.";
  }

  if (isEmpty(data.degree)) {
    errors.degree = "Company field is required.";
  }

  if (isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Company field is required.";
  }

  if (isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
