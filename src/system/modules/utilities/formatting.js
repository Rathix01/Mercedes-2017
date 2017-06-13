var R = require('ramda');

function stringToNumberWithCommas( numberString ) {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// stolen from BenefitStore. as used in multiple places.
function toNumberWithCommas( number ) {
  return stringToNumberWithCommas(number.toString());
}

function toNumberWithCommasAnd2Dp( number ) {
  var num = parseFloat( number ).toFixed(2);
  return toNumberWithCommas( num );
}
function toCurrency( number ) {
  return '$'+toNumberWithCommas(number);
}
function toCurrencyWithCents( number ) {
  return '$'+toNumberWithCommasAnd2Dp(number);
}

// takes NZ format DD/MM/YYYY and returns more universal YYYY-MM-DD
function toDateFormat( date ) {
	return R.merge( date, { value: date.value ? date.value.split("/").reverse().join("-") : "" } );
}

function removeUndefinedFromString( string ) {
  return R.replace(/undefined /g, '', string );
}


module.exports = {
  toNumberWithCommas: toNumberWithCommas,
  toNumberWithCommasAnd2Dp: toNumberWithCommasAnd2Dp,
  toCurrency: toCurrency,
  toCurrencyWithCents: toCurrencyWithCents,
  toDateFormat: toDateFormat,
  removeUndefinedFromString: removeUndefinedFromString
}