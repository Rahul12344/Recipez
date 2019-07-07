const charRem = require('./CharacterRemover');
const brand = require('./BrandNames');
const brandNameRem = require('./BrandNameRemover');

async function CanonRules(word) {
    word = charRem(word);
    try {
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