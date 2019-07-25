const dbDriver = require('./MongoDriver.js');
const decomposeRecipe = require('./DecomposeRecipe.js');

async function receiptDBDriver(){
    db = await dbDriver();
    return db;
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

async function queryByName (db, ingredients, recipeName) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find({ingredients}, (err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

async function updateRecipe (db, ingredients, recipeName) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find({ingredients}, (err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

async function allRecipes (db) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find((err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

module.exports =  { 
    receiptDBDriver: receiptDBDriver,
    addToRecipeFromReceipt: addToRecipeFromReceipt, 
    addToRecipe: addToRecipe, 
    queryRecipe: queryRecipe, 
    queryByName: queryByName, 
    updateRecipe: updateRecipe, 
    allRecipes: allRecipes 
};