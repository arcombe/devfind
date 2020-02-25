const isEmpty = require("./is-empty");

module.exports = validateCommentInput = data => {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = "You can't post an empty comment";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
