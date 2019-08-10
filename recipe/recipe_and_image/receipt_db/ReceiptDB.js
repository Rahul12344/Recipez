const dbDriver = require('./MongoDriver.js');
const decomposeRecipe = require('./DecomposeRecipe.js');
const RecipeSchema = require('./schemas/RecipeSchema');
const mongoosastic = require('mongoosastic');

const { ElasticSearchManager } = require('./elastic-search/RecipeSearch');

RecipeSchema.plugin(mongoosastic);

async function receiptDBDriver(){
    db = await dbDriver();
    return db;
}

async function addToUserMadeRecipes(db,recipe){
    const userRecipeCollection = db.collection('userrecipes');
    userRecipeCollection.insertOne(recipe, (err, result) => {
        if(err) throw err;
        return result;
    });
}

async function addToRecipeFromReceipt (db, recipes) {
    if(!db){
        return;
    }
    Recipe = db.model('recipe', RecipeSchema);
    Recipe.createMapping(function(err, mapping){  
        if(err){
          console.log('error creating mapping (you can safely ignore this)');
          console.log(err);
        }
        else{
          console.log(mapping);
        }
      });
    recipesDecomposed = decomposeRecipe.decomposeReceiptIntoComponents(recipes);
    try {
        await Recipe.insertMany(recipesDecomposed);
        return;
      } catch(error) {
        throw error
      }
}

async function addToRecipe (db, recipe) {
   const recipeCollection = db.collection('recipes');
   recipeHash = decomposeIntoComponents(recipe);
   ({ queryIngredients, numberRemainingIngredients, remainingIngredients, recipeName, instructions } = recipeHash);
   recipeCollection.insertOne({queryIngredients:{numberRemainingIngredients:{remainingIngredients:{remainingIngredients:instructions}}}}, (err, result) => {
        if(err) throw err;
        return result;
   });
}

async function updateRecipe (db, ingredients, recipeName) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find({ingredients}, (err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

async function addRecipeHit(db, recipeName, increase){
    const recipeCollection = db.collection('recipes');
    recipeCollection.updateOne({"label": recipeName},{ $inc: { "hits" : increase } }, (err,result) => {
        if(err) throw err;
        return result;
    });
}

async function queryRecipe (db, ingredients) {
    if(!db){
        return;
    }
    recipes = {};
    /*client = new ElasticSearchManager();
    payload = await client.search('banana');
    recipes = client._filter(payload);*/
    await queryRecipePromise(db,ingredients)
    .then(rec => {
        recipes = rec;
    })
    .catch(error => {
        throw error;
    })
    return recipes;
}

async function queryByName (db, recipeName) {
    if(!db){
        return;
    }
    recipes = {};
    await queryByNamePromise(db, recipeName)
    .then(rec => {
        recipes = rec.recipes;
    })
    .catch(error => {
        throw error;
    })
    return recipes;
}

async function allRecipes (db) {
    if(!db){
        return;
    }
    recipes = {};
    await allRecipesPromise(db)
    .then(rec => {
        recipes = rec;
    })
    .catch(error => {
        throw error;
    })
    return recipes;
}


async function matchingUserRecipes (db,ingredients) {
    recipes = {};
    await matchingUserRecipesPromise(db,ingredients)
    .then(rec => {
        recipes = rec;
    })
    .catch(error => {
        throw error;
    })
    return recipes;
}

async function getTrendingRecipes(db) {
    recipes = await allRecipes(db);
}

/*** PROMISES QUERYING DB ***/

async function queryRecipePromise(db, ingredients){
    const recipeCollection = await db.collection('recipes');
    query = createIngredientQuery(ingredients);
    var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({$and:query}).sort({hits:-1}).limit(5).toArray((err,res) => {
            if(err) throw err;
            recipes = res;
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}

async function queryByNamePromise (db, recipeName) {
    const recipeCollection = db.collection('recipes');
     var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({"label": recipeName},{_id: 0}).toArray((err,res) => {
            if(err) throw err;
            recipes = [];
            res.forEach((recipe) => {
                recipes.push(recipe.recipes);
            });
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}

async function allRecipesPromise (db) {
    const recipeCollection = await db.collection('recipes');
    var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({}).toArray((err,res) => {
            if(err) throw err;
            recipes = [];
            res.forEach((recipe) => {
                recipes.push(recipe.recipes);
            });
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}

async function matchingUserRecipesPromise (db,ingredients) {
    const recipeCollection = await db.collection('userrecipes');
    var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({}).toArray((err,res) => {
            if(err) throw err;
            recipes = [];
            res.forEach((recipe) => {
                recipes.push(recipe.recipes);
            });
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}

function createIngredientQuery(ingredients){
    queries=[];
    ingredients.forEach((ingredient) => {
        queries.push(
            {
                ingredientLines:
                {
                    $regex:'.*' + ingredient + '.*'
                }
            }
        )
    })
    return queries;
}

queryRecipe('',['banana']);
module.exports =  { 
    receiptDBDriver: receiptDBDriver,
    addToUserMadeRecipes: addToUserMadeRecipes,
    addToRecipeFromReceipt: addToRecipeFromReceipt, 
    addToRecipe: addToRecipe, 
    queryRecipe: queryRecipe, 
    queryByName: queryByName, 
    updateRecipe: updateRecipe, 
    allRecipes: allRecipes,
    addRecipeHit: addRecipeHit, 
    matchingUserRecipes: matchingUserRecipes,
    getTrendingRecipes: getTrendingRecipes,
};