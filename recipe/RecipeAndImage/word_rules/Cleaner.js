const csv = require('csvtojson');

class Cleaner {
    charParser(word) {
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

    brandParser(word, brandNames) {
        for (var i = 0; i < brandNames[0].length; i++) {
          word = word.replace(brandNames[0][i].brand.toLowerCase(), '')
        }
        return word;
    }

    async getBrandNames(){
        listOfBrands = [];
        try {
            await csv()
                .fromFile('/Users/rahulnatarajan/Desktop/Recipez/recipe/recipe_and_image/word_rules/word-rules-scripts/word-assoc-script/recipesum.csv')
                .then((jsonObj)=>{
                listOfBrands.push(jsonObj);
            });
            return listOfBrands;
        }
        catch (error) {
            return error;
        }
    }

    async CanonRules(word) {
        try {
            word = word.replace(/(\n).*/g,'');
            word = charParser(word);
            var brands = await getBrandNames();
            word = brandParser(word, brands);
            word = word.replace(/(\s)+/g,' ');
            word = word.replace(/^(\s)/g,'');
            word = word.replace(/(\s)$/g,'');
            return word;
        }
        catch (error) {
            return error;
        }
    }
}

module.exports = { Cleaner }
