const store = require('./FindStore');
const target = require('../../receipt_types/target/ItemFinder.js');
const trader = require('../../receipt_types/trader-joes/ItemFinder.js');

async function getIngredients (filePath) {
  try {
    storeName = await store(filePath);
    ingredients = [];
    switch (storeName) {
      case 0:
        ingredients = await target(filePath);
        break;
      case 1:
        ingredients = [];
        break;
      case 2:
        ingredients = await trader(filePath);;
        break;
      default:
        ingredients = [];
        break;
    }
    return ingredients;
  }
  catch (error) {
    return error;
  }
}

module.exports = getIngredients;
