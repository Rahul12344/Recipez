/*
  RULES for reference
    All lower case
    No non-alpha chars
    No brand names
    No unnecessary qualifiers i.e. weight
*/
function brandParser(word, brandNames) {
  for brand in brandNames {
    word = word.replace(brand, '')
  }
  return word;
}
