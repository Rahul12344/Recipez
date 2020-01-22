/*
  RULES for reference
    All lower case
    No non-alpha chars
    No brand names
    No unnecessary qualifiers i.e. weight
*/
function brandParser(word, brandNames) {
  for (var i = 0; i < brandNames[0].length; i++) {
    word = word.replace(brandNames[0][i].brand.toLowerCase(), '')
  }
  return word;
}

module.exports = brandParser;
