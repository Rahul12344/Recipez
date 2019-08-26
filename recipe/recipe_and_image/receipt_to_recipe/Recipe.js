const getIngredients = require('./store_type/ItemFromStore.js');
const getRecipeFromAPI = require('./RecipeEdamam.js');
const canonRules = require('../word_rules/CanonRules.js');

const { ElasticSearchManager } = require('../receipt_db/elastic-search/RecipeSearch');
const { FoodWords } = require('../../bounds/associations/FoodWords');

const reformatter = require('../receipt_db/DecomposeRecipe.js')

/* 
  Checks hosted DB for recipes; if the recipe does not exist, pings API to obtain recipe
*/
async function compileRecipes(filePath) {
  ingredients = await getIngredients(filePath);
  FoodWordIdentifier = new FoodWords();
  cleanIngredients = [];

  for (var i = 0; i < ingredients.length; i++) {
    var cleanIngredient = await canonRules(ingredients[i]);
    if(FoodWordIdentifier.isFoodWord(ingredients[i])){
      cleanIngredients.push(cleanIngredient);
    }
  }
  if(ingredients == []){
    return [];
  }

  recipe = '';
  ElasticSearchManager = new ElasticSearchManager();
  drecipe = await ElasticSearchManager.search(cleanIngredients);
  if(drecipe.length > 30){
    drecipe = esm._filter(drecipe);
    recipe = drecipe;
  }
  else{
    recipe = await edamRecipe(cleanIngredients);
  }
  return recipe.slice(0,5);  
}

async function addUserRecipe(recipe){
  reformattedRecipe = reformatter.decomposeReceiptIntoComponents(recipe);
  
  return reformattedRecipe;  
}

async function edamRecipe (ingredients) {
  try {
    recipes = await getRecipeFromAPI(ingredients);
    return recipes;
  }
  catch (error) {
    return error;
  }
}

module.exports = {
  recipe: compileRecipes,
  addUserRecipe: addUserRecipe
}
