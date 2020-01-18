module.exports = function parseStringAsArray(arrayAsString, splitParam = ',') {
  return arrayAsString.split(splitParam).map(item => item.trim());
}
