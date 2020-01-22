const brands = require('./BrandNames.js');
const bnr = require('./BrandNameRemover.js');
/*
  RULES for reference
    All lower case
    No non-alpha chars
    No brand names
    No unnecessary qualifiers i.e. weight
*/

/*
  Need to deprecate this in favor of something more easily understandable/algorithmically faster
*/
function charParser(word) {
  word = word.toLowerCase();
  word.replace(/[^a-zA-Z\s]+/g,' ');
  word = word.replace(/[\s]+/g, ' ');
  word = word.replace(/([0-9]+\.)[0-9]+(\s)?g/g, '');
  word = word.replace(/([0-9]+\.)?[0-9]+(\s)?lbs?/g, '');
  word = word.replace(/([0-9]+\.)?[0-9]+(\s)?oz?/g, '');
  word = word.replace(/([0-9]+\.)?[0-9]+(\s)?ct?/g, '');
  word = word.replace(/([0-9]+\/)?[0-9]+(\s)?ct?/g, '');
  word = word.replace(/[0-9]+/g, '');
  word = word.replace(/products?/g, '');
  word = word.replace(/own/g, '');
  word = word.replace(/foods?/g, '');
  word = word.replace(/each/g, '');
  word = word.replace(/\-/g,'');
  word = word.replace('.',' ');
  word = word.replace('/',' ');
  word = word.replace('™','');
  word = word.replace('®','');
  word = word.replace('related','');
  word = word.replace('original','');
  word = word.replace('cuisine','');
  word = word.replace('assorted','');
  word = word.replace('suggested','');
  word = word.replace('classic','');
  word = word.replace('kit','');
  word = word.replace('frozen','');
  word = word.replace('all','');
  word = word.replace('assorted','');
  word = word.replace(/[a-z]+ly/g,'');
  word = word.replace(/(\s)+/g,' ');
  word = word.replace(/^(\s)/g,'');
  word = word.replace(/(\s)$/g,'');

  return word;
}

module.exports = charParser;
