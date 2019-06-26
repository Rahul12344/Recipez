var buildUrl = require('build-url');
const axios = require('axios');
const compile = require('../TextClassify.js');
const unirest = require('unirest');

const createQuery = require('./QueryCreater.js')

async function recipe(ingredients){
  /*
  // TODO: Error handling
  */
  if(ingredients.length <= 0){
    throw NoRecipeException;
  }
  query_url = createQuery(ingredients);
  shortenedRecipes = [];
  try{
    const result = await axios.get(query_url);
    recipes = result.data.hits;
    /*
    // TODO: Error handling
    */
    if(recipes.length == 0){
      throw NoRecipeException;
    }
    for(var i = 0; i < recipes.length; i++){
      var curr_recipe = recipes[i].recipe;
      var ings = separate_ingredients(ingredients, curr_recipe.ingredientLines);
      shortenedRecipes.push({
        label: curr_recipe.label,
        calories: curr_recipe.calories,
        totalTime: curr_recipe.totalTime,
        url: curr_recipe.url,
        haves: ings.haves,
        have_nots: ings.have_nots,
        ingredientLines: curr_recipe.ingredientLines
      });
    }
    return shortenedRecipes;
  }
  catch(error) {
    console.log(error);
    return
  }
}

function separate_ingredients(ingredients, all){
  var haves = [];
  var have_nots = [];

  for(var i = 0; i < all.length; i++){
    for(var j = 0; j < ingredients.length; j++){
      if(all[i].includes(ingredients[j])){
        haves.push(all[i]);
        break;
      }
      else {
        have_nots.push(all[i]);
        break;
      }
    }
  }
  return {
    haves,
    have_nots
  }
}

async function recRecipe(ingredients, response) {
  try {
    response = await recipe(ingredients);
    return response;
  } catch(error) {
    console.log(error);
  }
  return response
}

async function getFinal(item){
  potential_ings = item.split(" ");

  for(var i = potential_ings.length - 1; i >= 0; i--){
    var recipes = '';
    try {
      recipes = await recipe([potential_ings[i]]);
    } catch(error) {
      console.log(error);
      return "ERR";
    }
    if(recipes != ''){
      return potential_ings[i];
    }
  }
  return ''
}

async function recipeParser(result){
  recipes = '';
  final_items = [];

  for(var i = 0; i < result.length; i++){
    var curr_item = result[i];
    var item = '';
    try {
      item = await getFinal(curr_item);
    }
    catch(err){
      console.log(err)
    }
    if(item != '' && item != 'ERR'){
      final_items.push(item)
    }
  }

  while(true) {
    if(result === []) {
      return;
    }
    try {
      recipes = await recRecipe(final_items, recipes);
    } catch(error) {
      console.log(error);
    }
    if(recipes != '') {
      return recipes;
    }
    else {
      final_items.pop();
    }
  }
}

async function comEdamRec(result) {
  finalRecipe = await recipeParser(result);
  return finalRecipe;
}

module.exports = comEdamRec;
