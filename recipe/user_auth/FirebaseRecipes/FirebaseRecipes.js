const refomatter = require('../../recipe_and_image/receipt_db/DecomposeRecipe.js');


async function getAllRecipesComp(firebaseDB,firebase){
    var recipeDict = {};
    await getAllRecipes(firebaseDB,firebase)
    .then(result => {
        recipeDict =  result;
    })
    .catch(error => {
        throw error;
    })
    return recipeDict;
}

async function getAllRecipes(firebaseDB,firebase){
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

function addRecipe(firebaseDB,firebase,recipe){
    console.log("Adding recipe to firebase");
    try{
        return firebaseDB.ref('users/' + firebase.auth().currentUser.uid + '/recipes/').set(refomatter.decomposeIntoComponentsForFirebaseAndDisplay(recipe));
    }
    catch(err){
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
    getAllRecipesComp:getAllRecipesComp,
    recipify: recipify
}


