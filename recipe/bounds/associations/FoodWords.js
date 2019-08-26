const axios = require('axios');

class FoodWords{

    constructor(){
        this.FOOD_CLASSIFICATION_FLASK_HOST = 'localhost:5000/'
    }

    async isFoodWord(potentialFoodWord){
        score = await this.process(potentialFoodWord);
        return score;
    }

    async process(potentialFoodWord){
        var score = await axios.get(query(potentialFoodWord));
        return score;
    }

    query(potentialFoodWord){
        var isFoodQueryEndpoint = `${this.FOODCLASSIFICATIONHOST}processfoodword?=food${potentialFoodWord}`;
        return isFoodQueryEndpoint;
    }


}

module.exports = { FoodWords }