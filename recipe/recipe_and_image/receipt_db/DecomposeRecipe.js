function decomposeReceiptIntoComponents(recipe){
    ingredientQuery = recipe.q;
    allHits = recipe.hits;
    allRecipeMatches = [];
    allHits.forEach(hit => {
        var otherIngredients = splitIngredients(ingredientQuery,hit.recipe.ingredientLines).have_nots;
        var myIngredients = splitIngredients(ingredientQuery,hit.recipe.ingredientLines).haves;
        allRecipeMatches.push(
        {
            'uri': hit.recipe.uri,
            'label': hit.recipe.label,
            'source': hit.recipe.source,
            'url': hit.recipe.url,
            'healthLabels': hit.recipe.healthLabels,
            'ingredientLines': hit.recipe.ingredientLines,
            'totalTime': hit.recipe.totalTime,
            'hits': 0
        });
    });
    recipeStructure = allRecipeMatches;
    return recipeStructure;
}

function decomposeIntoComponentsForFirebaseAndDisplay(recipe){
    recipeStructure = {[recipe.label]:{
        'label': recipe.label,
        'source': recipe.source,
        'url': recipe.url,
        'healthLabels': recipe.healthLabels,
        'ingredientLines': recipe.ingredientLines,
        'totalTime': recipe.totalTime,
    }};
    return recipeStructure;
}

function splitIngredients(userIngredients, recipeIngredients){
    var haves = [];
    var have_nots = [];

    for(var i = 0; i < recipeIngredients.length; i++){
        for(var j = 0; j < userIngredients.length; j++){
            if(recipeIngredients[i].includes(userIngredients[j])){
                haves.push(recipeIngredients[i].replace('.',''));
                break;
            } 
            else {
                have_nots.push(recipeIngredients[i].replace('.',''));
                break;
            }
        }   
    }
    haves.sort();
    have_nots.sort();
    return {
        haves,
        have_nots
    }
}  

module.exports = {
    decomposeReceiptIntoComponents: decomposeReceiptIntoComponents,
    decomposeIntoComponentsForFirebaseAndDisplay: decomposeIntoComponentsForFirebaseAndDisplay
};