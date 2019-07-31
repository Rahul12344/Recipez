const refomatter = require('../../recipe_and_image/receipt_db/DecomposeRecipe.js');
const recipeMongoDB = require('../../recipe_and_image/receipt_db/ReceiptDB');


async function getAllRecipes(firebaseDB,firebase){
    var recipeDict = {};
    console.log("Getting all recipes");
    await getAllRecipesPromise(firebaseDB,firebase)
    .then(result => {
        console.log(result);
        recipeDict =  result;
    })
    .catch(error => {
        throw error;
    })
    return recipeDict;
}

async function getAllRecipesPromise(firebaseDB,firebase){
    ref = await firebaseDB.ref('users/' + firebase.auth().currentUser.uid).child('recipes');
    var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
        ref.on('value', function(snap) {
            filteredObj = snap.val();
            resolve(filteredObj);
        });
    });
    return filterDataAccordingToRecipes;
}

function getRecipe(firebaseDB,firebase,ingredients){
    firebaseDB.ref('users/' + firebase.auth().currentUser.uid + '/recipes/').on(ingredients, (snapshot,err) => {
        if(err) throw err;
        return snapshot.val();
      });
}

async function addRecipe(firebaseDB,firebase,recipe){
    console.log("Adding recipe to firebase");
    try{
        recipecontainer = await recipeMongoDB.receiptDBDriver();
        updatedHits = await recipeMongoDB.addRecipeHit(recipecontainer,recipe.label,1);
        return firebaseDB.ref('users/' + firebase.auth().currentUser.uid + '/recipes/').update(refomatter.decomposeIntoComponentsForFirebaseAndDisplay(recipe));
    }
    catch(err){
        console.log(err);
        throw new FirebaseError();
    }
}

function recipify(label,uri,source,healthLabels,url,ingredientLines,totalTime){
    return {
        'label': label,
        'uri': uri,
        'source': source,
        'url': url,
        'healthLabels': healthLabels,
        'ingredientLines': ingredientLines,
        'totalTime': totalTime,
    }
}

module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    addRecipe: addRecipe,
    recipify: recipify
}


