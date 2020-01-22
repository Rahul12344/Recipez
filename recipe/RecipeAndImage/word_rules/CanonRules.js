const charRem = require('./CharacterRemover');
const brand = require('./BrandNames');
const brandNameRem = require('./BrandNameRemover');

async function CanonRules(word) {
    try {
        word = word.replace(/(\n).*/g,'');
        word = charRem(word);
        var brands = await brand();
        word = brandNameRem(word, brands);
        word = word.replace(/(\s)+/g,' ');
        word = word.replace(/^(\s)/g,'');
        word = word.replace(/(\s)$/g,'');
        return word;
    }
    catch (error) {
        return error;
    }
}

module.exports = CanonRules