const mongoose = require('mongoose');
const decomposeRecipe = require('../DecomposeRecipe');
const RecipeSchema = require('../schemas/RecipeSchema');
const mongoosastic = require('mongoosastic');

class RecipeMongo {

    constructor(){
        this.RECEIPT_DB_URL = "mongodb://localhost:27017/receipt_db";
        this.client = mongoose.createConnection(this.RECEIPT_DB_URL, { useNewUrlParser: true });
        RecipeSchema.plugin(mongoosastic);
        this.Recipe = this.client.model('recipe', RecipeSchema);
        this.Recipe.createMapping(function(err, mapping){  
            if(err){
              console.log(err);
            }
            else{
              console.log(mapping);
            }
        });
    }

    close(){
        this.client.close();
        return;
    }

    async addRecipe(recipes){
        let recipesDecomposed = decomposeRecipe.decomposeReceiptIntoComponents(recipes);
        try {
            await this.Recipe.insertMany(recipesDecomposed);
            return recipesDecomposed;
        } catch(error) {
            throw error
        }
    }
    
    async addRecipeHit(recipeName, increase){
        const recipeCollection = this.client.collection('recipes');
        recipeCollection.updateOne({"label": recipeName},{ $inc: { "hits" : increase } }, (err,result) => {
            if(err) throw err;
            return result;
        });
    }
    
    async queryRecipe (ingredients) {
        recipes = {};
        await this.queryRecipePromise(ingredients)
        .then(rec => {
            recipes = rec;
        })
        .catch(error => {
            throw error;
        })
        return recipes;
    }
    
    async queryByName (recipeName) {
        recipes = {};
        await this.queryByNamePromise(recipeName)
        .then(rec => {
            recipes = rec.recipes;
        })
        .catch(error => {
            throw error;
        })
        return recipes;
    }
    
    async allRecipes () {
        recipes = {};
        await this.allRecipesPromise()
        .then(rec => {
            recipes = rec;
        })
        .catch(error => {
            throw error;
        })
        return recipes;
    }
    
    
    async matchingUserRecipes (ingredients) {
        recipes = {};
        await this.matchingUserRecipesPromise(ingredients)
        .then(rec => {
            recipes = rec;
        })
        .catch(error => {
            throw error;
        })
        return recipes;
    }
    
    async getTrendingRecipes() {
        recipes = await allRecipes();
    }
    
    async mapReduce(){
        let mapper = {};
        mapper.map = () => {
            emit(Recipe.label)
        };
        mapper.reduce = (key,values) => {
            return values;
        };
        this.Recipe.mapReduce(mapper, (err,res) => {
            if(err) throw err;
            console.log(res);
        });
    }
    
    async queryRecipePromise(ingredients){
        const recipeCollection = await this.client.collection('recipes');
        query = createIngredientQuery(ingredients);
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            recipeCollection.find({$and:query}).sort({hits:-1}).limit(5).toArray((err,res) => {
                if(err) throw err;
                recipes = res;
                resolve(recipes);
            });
        });
        return filterDataAccordingToRecipes;
    }
    
    async queryByNamePromise (recipeName) {
        const recipeCollection = this.client.collection('recipes');
         var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            recipeCollection.find({"label": recipeName},{_id: 0}).toArray((err,res) => {
                if(err) throw err;
                recipes = [];
                res.forEach((recipe) => {
                    recipes.push(recipe.recipes);
                });
                resolve(recipes);
            });
        });
        return filterDataAccordingToRecipes;
    }
    
    async allRecipesPromise () {
        const recipeCollection = await this.client.collection('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            recipeCollection.find({}).toArray((err,res) => {
                if(err) throw err;
                recipes = [];
                res.forEach((recipe) => {
                    recipes.push(recipe.recipes);
                });
                resolve(recipes);
            });
        });
        return filterDataAccordingToRecipes;
    }
    
    async matchingUserRecipesPromise (ingredients) {
        const recipeCollection = await this.client.collection('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            recipeCollection.find({}).toArray((err,res) => {
                if(err) throw err;
                recipes = [];
                res.forEach((recipe) => {
                    recipes.push(recipe.recipes);
                });
                resolve(recipes);
            });
        });
        return filterDataAccordingToRecipes;
    }
    
    createIngredientQuery(ingredients){
        var queries=[];
        ingredients.forEach((ingredient) => {
            queries.push(
                {
                    ingredientLines:
                    {
                        $regex:'.*' + ingredient + '.*'
                    }
                }
            )
        });
        return queries;
    }

}

module.exports = { RecipeMongo };
