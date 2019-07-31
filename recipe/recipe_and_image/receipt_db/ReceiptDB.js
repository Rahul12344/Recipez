const dbDriver = require('./MongoDriver.js');
const decomposeRecipe = require('./DecomposeRecipe.js');

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
   const recipeCollection = db.collection('recipes');
   matches = await queryRecipe(db, recipes.q);
   if(matches.length > 0){
       return;
   }
   recipesDecomposed = decomposeRecipe.decomposeReceiptIntoComponents(recipes);
    recipeCollection.insertOne(recipesDecomposed, (err, result) => {
        if(err) throw err;
        return result;
    });
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
    recipeCollection.updateOne({"recipes.label": recipeName},{ $inc: { "recipes.$.hits" : increase } }, (err,result) => {
        if(err) throw err;
        return result;
    });
}

async function queryRecipe (db, ingredients) {
    recipes = {};
    await queryRecipePromise(db, ingredients)
    .then(rec => {
        recipes = rec;
    })
    .catch(error => {
        throw error;
    })
    return recipes;
}

async function queryByName (db, recipeName) {
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
    var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({'q':ingredients}).toArray((err,res) => {
            if(err) console.log("ERROR");
            recipes = [];
            res.forEach((recipe) => {
                recipes.push(recipe.recipes);
            });
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}

async function queryByNamePromise (db, recipeName) {
    const recipeCollection = db.collection('recipes');
     var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        recipeCollection.find({"recipes.label": recipeName},{_id: 0, recipes: {$elemMatch: {label: recipeName}}}).toArray((err,res) => {
            if(err) console.log("ERROR");
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
            if(err) console.log("ERROR");
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
            if(err) console.log("ERROR");
            recipes = [];
            res.forEach((recipe) => {
                recipes.push(recipe.recipes);
            });
            resolve(recipes);
        });
    });
    return filterDataAccordingToRecipes;
}


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
    getTrendingRecipes: getTrendingRecipes
};