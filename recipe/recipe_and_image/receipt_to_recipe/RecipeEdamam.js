const axios = require('axios');

const createQuery = require('./QueryCreater.js');

const combinations = require('../../recipe_helpers/Combinations.js');

const { RecipeMongo } = require('../receipt_db/mongo/RecipeMongo');
const { ElasticSearchManager } = require('../receipt_db/elastic-search/RecipeSearch');

async function comEdamRec(result) {
  try {
    finalRecipe = await recipeParser(result);
    return finalRecipe;
  } catch (error) {
    return error;
  }
}

async function recipeParser(result){
  recipes = '';
  drecipe = [];
  final_items = result;
  esm = new ElasticSearchManager();

  combinationsOfFinalItems = combinations(final_items);
  for(var i = 0; i < combinationsOfFinalItems.length; i++){
    drecipe = await esm.search(combinationsOfFinalItems[i]);
    if(drecipe.length >= 5){
      return esm._filter(drecipe);
    }
    recipes = await recRecipe(combinationsOfFinalItems[i]);
    if(recipes != '') {
      return recipes;
    }
  }
  return recipes;
}

async function recRecipe(ingredients) {
  try {
    response = await recipe(ingredients);
    return response;
  } catch(error) {
    console.log(error);
  }
  return response
}

async function recipe(ingredients){
  if(ingredients.length <= 0){
    throw NoIngredientsException;
  }
  query_url = createQuery(ingredients);
  try{
    const result = await axios.get(query_url);
    recipes = result.data;
    if(!recipes){
      throw NoRecipeException;
    }
    recipeContainer = new RecipeMongo();
    added = await recipeContainer.addRecipe(recipes);
    recipeContainer.close();
    return added;
  }
  catch(error) {
    console.log(error);
    return;
  }
}

module.exports = comEdamRec;
