/* define functions that could be used to generic purposes */

/* This function can be used to prevent user for typing non-numerical characters */
function validateNumeric(input) {
  return input.replace(/[\D]/g, "");
}

/* This function can be used to prevent user for typing non-alphabetical characters */
function validateAlphabetic(input) {
  return input.replace(/[^a-zA-Z\s]/g, "");
}

export { validateNumeric, validateAlphabetic };
