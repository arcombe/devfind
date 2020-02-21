const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateExperienceInput = data => {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }

  if (isEmpty(data.company)) {
    errors.company = "Company field is required.";
  }

  if (isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
