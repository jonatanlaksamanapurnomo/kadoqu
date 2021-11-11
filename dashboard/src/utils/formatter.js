/* define functions that could be used to generic formatting */

/* This function can be used to format integer/float into Indonesian currency format (without "Rp") */
function numericToCurrency(number, withDecimal = false) {
  const n = withDecimal ? 2 : 0;
  const re = "\\d(?=(\\d{3})+" + (n > 0 ? "\\." : "$") + ")";
  return number.toFixed(n).replace(new RegExp(re, "g"), "$&,");
}

/* This function can be used to format Indonesian currency format (without "Rp") into int */
function currencyToInt(currency) {
  return parseInt(currency.split(",")[0].replace(/[\D]/g, ""));
}

export { numericToCurrency, currencyToInt };
