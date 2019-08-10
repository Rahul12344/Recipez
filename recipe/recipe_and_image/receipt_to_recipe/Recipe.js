const getIngredients = require('./store_type/ItemFromStore.js');
const getRecipeFromAPI = require('./RecipeEdamam.js');
const recipeFromDB = require('./RecipeFromDB.js')
const canonRules = require('../word_rules/CanonRules.js');

const reformatter = require('../receipt_db/DecomposeRecipe.js')

/* 
  Checks hosted DB for recipes; if the recipe does not exist, pings API to obtain recipe
*/
async function compileRecipes(filePath) {
  ingredients = await getIngredients(filePath);
  if(ingredients == []){
    return [];
  }
  cleanIngredients = [];
  for (var i = 0; i < ingredients.length; i++) {
    var cleanIngredient = await canonRules(ingredients[i]);
    cleanIngredients.push(cleanIngredient);
  }
  recipe = '';
  cleanIngredients = ['chicken','bread'];
  drecipe = await getRecipeFromDB(cleanIngredients);
  if(drecipe.length > 0){
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

async function getRecipeFromDB (ingredients) {
  try {
    recipes = await recipeFromDB(ingredients);
    return recipes;
  }
  catch(error) {
    return error;
  }
}


module.exports = {
  recipe: compileRecipes,
  addUserRecipe: addUserRecipe
}
