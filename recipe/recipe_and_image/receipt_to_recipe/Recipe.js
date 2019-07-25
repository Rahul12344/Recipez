/*
// TODO: Compile list of recipes obtained from API and db
*/
const getIngredients = require('./store_type/ItemFromStore.js');
const getRecipeFromAPI = require('./RecipeEdamam.js');
const recipeFromDB = require('./RecipeFromDB.js')
const canonRules = require('../word_rules/CanonRules.js');

async function compileRecipes(filePath) {
  ingredients = await getIngredients(filePath);
  cleanIngredients = [];
  for (var i = 0; i < ingredients.length; i++) {
    var cleanIngredient = await canonRules(ingredients[i]);
    cleanIngredients.push(cleanIngredient);
  }
  recipe = '';
  drecipe = await getRecipeFromDB(cleanIngredients);
  if(drecipe.length > 0){
    recipe = drecipe[0];
  }
  else{
    recipe = await edamRecipe(cleanIngredients);
  }
  return recipe;  
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

async function getRecipeFromDB (ingredients) {
  try {
    recipes = await recipeFromDB(ingredients);
    return recipes;
  }
  catch(error) {
    return error;
  }
}

compileRecipes(['chicken']);

module.exports = compileRecipes;
