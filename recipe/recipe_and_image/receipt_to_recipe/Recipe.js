/*
// TODO: Compile list of recipes obtained from API and db
*/
const getIngredients = require('./store_type/ItemFromStore.js');
const comEdamRec = require('./RecipeEdamam.js');

async function edamRecipe (ingredients) {
  recipes = await comEdamRec(ingredients);
  return recipes;
}

async function dbRecipe (ingredients) {
  recipes = await recipeFromDB(ingredients);
  return recipes;
}

async function compileRecipes() {
  ingredients = await getIngredients();
  erecipe = await edamRecipe(ingredients); drecipe = await dbRecipe(ingredients);
  recipe = erecipe + drecipe;

  return recipe;
}

module.exports = compileRecipes;
