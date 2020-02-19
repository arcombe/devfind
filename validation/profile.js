const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  if (isEmpty(data.handle)) {
    errors.handle = "Handle field is required.";
  }

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Profile handle needs to be between 2 and 40 characters.";
  }

  if (isEmpty(data.status)) {
    errors.status = "Profile status field is required.";
  }

  if (isEmpty(data.skills)) {
    errors.skills = "Profile skills field is required.";
  }

  if (!isEmpty(data.website) && !Validator.isURL(data.website)) {
    errors.website = "Not a valid URL.";
  }

  if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
    errors.facebook = "Not a valid URL.";
  }

  if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
    errors.instagram = "Not a valid URL.";
  }

  if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) {
    errors.linkedin = "Not a valid URL.";
  }

  if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
    errors.youtube = "Not a valid URL.";
  }

  if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
    errors.twitter = "Not a valid URL.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
