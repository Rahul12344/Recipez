const dbDriver = require('./MongoDriver.js');
/*
{
    {
        
    }
}
*/

async function addToRecipeFromReceipt (db, recipe) {
    /*
        DECOMPOSE JSON of recipe from receipt to information accurate 
        in the receipt_db
    */
   const recipeCollection = db.collection('recipes');
   recipeHash = decomposeReceiptIntoComponents(recipe);
   ({ queryIngredients, numberRemainingIngredients, remainingIngredients, recipeName, instructions } = recipeHash);
   recipeCollection.insertOne({queryIngredients:{numberRemainingIngredients:{remainingIngredients:{remainingIngredients:instructions}}}}, (err, result) => {
        if(err) throw err;
        return result;
   });
}

function addToRecipe (db, recipe) {
    /*
        DECOMPOSE JSON of recipe added maually to information accurate
        in the receipt_db
    */
   const recipeCollection = db.collection('recipes');
   recipeHash = decomposeIntoComponents(recipe);
   ({ queryIngredients, numberRemainingIngredients, remainingIngredients, recipeName, instructions } = recipeHash);
   recipeCollection.insertOne({queryIngredients:{numberRemainingIngredients:{remainingIngredients:{remainingIngredients:instructions}}}}, (err, result) => {
        if(err) throw err;
        return result;
   });
}

function queryRecipe (db, ingredients) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find({ingredients}, (err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

function queryByName (db, ingredients, recipeName) {
    const recipeCollection = db.collection('recipes');
}

function updateRecipe (db, ingredients, recipeName) {
    const recipeCollection = db.collection('recipes');
}

function allRecipes (db) {
    const recipeCollection = db.collection('recipes');
    recipeCollection.find((err,items) => {
        if(err) throw err;
        return JSON.parse(items);
    });
}

export { addToRecipeFromReceipt, addToRecipe, queryRecipe, queryByName, updateRecipe, allRecipes };