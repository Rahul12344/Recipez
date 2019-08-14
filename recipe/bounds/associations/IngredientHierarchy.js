class IngredientHierarchy {

    constructor(recipe){
        this.recipe = recipe;
    }

    findPrimaries(){
        
    }

    checkTitle(title){
        let foodInTitle = this.findFoodWords(title);
        return foodInTitle
    }

    findFoodWords(title){
        let eachTitleWord = title.split();
        let foodWords = [];
        eachTitleWord.forEach((potentialFood) => {
            if(this.isFoodWord(potentialFood)){
                foodWords.push(potentialFood);
            }
        });
        return foodWords;
    }

    isFoodWord(){
        /* Check pre-trained model */
    }

    commonIngredients(){

    }

}

module.exports = { IngredientHierarchy }