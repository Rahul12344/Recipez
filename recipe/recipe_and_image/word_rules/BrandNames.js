const csv = require('csvtojson');

async function getBrandNames(){
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

module.exports = getBrandNames;
