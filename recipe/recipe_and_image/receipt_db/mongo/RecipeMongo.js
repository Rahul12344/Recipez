const mongoose = require('mongoose');
const decomposeRecipe = require('../DecomposeRecipe');
const RecipeSchema = require('../schemas/RecipeSchema');
const mongoosastic = require('mongoosastic');

class RecipeMongo {

    constructor(){
        this.RECEIPT_DB_URL = "mongodb://localhost:27017/receipt_db";
        this.client = mongoose.createConnection(RECEIPT_DB_URL, { useNewUrlParser: true });
        RecipeSchema.plugin(mongoosastic);
    }

    async addRecipe(){
        Recipe = db.model('recipe', RecipeSchema);
        Recipe.createMapping(function(err, mapping){  
            if(err){
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

}

module.exports = { RecipeMongo };
