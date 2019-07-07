/*
// TODO: Compile list of recipes obtained from API and db
*/
const getIngredients = require('./store_type/ItemFromStore.js');
const comEdamRec = require('./RecipeEdamam.js');
const canonRules = require('../word_rules/CanonRules.js')

async function edamRecipe (ingredients) {
  try {
    recipes = await comEdamRec(ingredients);
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

async function compileRecipes() {
  try {
    ingredients = await getIngredients(); cleanIngredients = [];
    for (ingredient in ingredients) {
      try {
        var cleanIngredient = await canonRules(ingredient);
        cleanIngredients.push(cleanIngredient);
      } 
      catch (error) {
        return error;
      }
    }
    try {
      erecipe = await edamRecipe(cleanIngredients); drecipe = await getRecipeFromDB(cleanIngredients);
      recipe = erecipe + drecipe;
      return recipe;
    }
    catch (error) {
      return error;
    }
  }
  catch (error) {

  }
}

module.exports = compileRecipes;
