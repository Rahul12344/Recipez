const axios = require('axios');

const createQuery = require('./QueryCreater.js');
const recipeDB = require('../receipt_db/ReceiptDB.js');
const decomposer = require('../receipt_db/DecomposeRecipe.js')

const combinations = require('../../recipe_helpers/Combinations.js');

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
  final_items = result;

  combinationsOfFinalItems = combinations(final_items);
  for(var i = 0; i < combinationsOfFinalItems.length; i++){
    recipes = await recRecipe(combinationsOfFinalItems[i]);
    
    if(recipes != '') {
      return recipes;
    }
  }
  return recipes;
}

async function recipe(ingredients){
  if(ingredients.length <= 0){
    throw NoIngredientsException;
  }
  query_url = createQuery(ingredients);
  try{
    const result = await axios.get(query_url);
    recipes = result.data;
    console.log(recipes);
    recipecontainer = await recipeDB.receiptDBDriver();
    added = await recipeDB.addToRecipeFromReceipt(recipecontainer,recipes);
    if(!recipes){
      throw NoRecipeException;
    }
    return recipes;
  }
  catch(error) {
    console.log(error);
    return
  }
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

module.exports = comEdamRec;
