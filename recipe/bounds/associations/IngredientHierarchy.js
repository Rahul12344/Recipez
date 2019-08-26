const { FoodWords } = require('./FoodWords');

class IngredientHierarchy {

    constructor(recipe){
        this.recipe = recipe;
        this.foodWords = new FoodWords();
    }

    findPrimaries(){
        let titlePrimaries = this.checkTitle(this.recipe.label);
        let ingredientPrimaries = this.rankingsForIngredients(this.recipe.ingredients);
        let primaries = titlePrimaries;
        primaries.append(ingredientPrimaries);
        return primaries;
    }

    checkTitle(title){
        let foodInTitle = this.findFoodWords(title);
        return foodInTitle
    }

    findFoodWords(title){
        let eachTitleWord = title.split();
        let foodWords = [];
        eachTitleWord.forEach((potentialFood) => {
            if(this.isFoodWord(this.foodWords.process(potentialFood))){
                foodWords.push(potentialFood);
            }
        });
        return foodWords;
    }

    isFoodWord(score){
        if(score){
            return true;
        }
        return false;
    }

    rankingsForIngredients(ingredients){

    }

}

module.exports = { IngredientHierarchy }