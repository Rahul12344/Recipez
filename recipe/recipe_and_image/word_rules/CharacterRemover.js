/*
  RULES for reference
    All lower case
    No non-alpha chars
    No brand names
    No unnecessary qualifiers i.e. weight
*/
function charParser(word) {
  word = word.toLowerCase();
  word.replace(/[^a-zA-Z\s]+/g,' ');
  word = word.replace(/[\s]+/g, ' ');
  word = word.replace(/[0-9]\s?+g/g, '');
  word = word.replace(/[0-9]\s?+lbs?/g, '');
  word = word.replace(/.*products?.*/g, '');
  word = word.replace(/.*own.*/g, '');
  word = word.replace(/.*foods?.*/g, '');
  return word;
}
