const admin = require("firebase-admin");
const firebase = require("firebase");

const serviceAccount = require("../credentials/serviceAccountKey.json");
const firebaseConfig = require("../credentials/export-key.js");

const refomatter = require('../../recipe_and_image/receipt_db/DecomposeRecipe.js');

const { RecipeMongo } = require('../../recipe_and_image/receipt_db/mongo/RecipeMongo');

class FirebaseManager {

    constructor(){
        this.config = firebaseConfig();
        this._init();
        this.initialization = this._initAdmin();
        this.firebasedb = admin.database();
    }

    _init() {
        firebase.initializeApp(this.config);
    }

    _initAdmin() {
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: config.databaseURL
        });
    }

    getUser() {
        return firebase.auth();
    }

    login(emailCred, passCred) {
        return firebase.auth().signInWithEmailAndPassword(emailCred, passCred);
    }

    logout() {
        return firebase.auth().signOut();
    }

    signup(emailCred, passCred) {
        firebase.auth().createUserWithEmailAndPassword(emailCred, passCred)
        .then((signedInUser) => {
            firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/profile/").set(JSON.parse(JSON.stringify(firebase.auth().currentUser)));
            firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/recipes/").set('');
            return signedInUser;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async getAllRecipes(){
        var recipeDict = {};
        await getAllRecipesPromise()
        .then(result => {
            recipeDict =  result;
        })
        .catch(error => {
            throw error;
        })
        return recipeDict;
    }
    
    async getRecipe(ingredients){
        var recipeDict = {};
        await getRecipePromise(ingredients)
        .then(result => {
            recipeDict =  result;
        })
        .catch(error => {
            throw error;
        })
        return recipeDict;
    }
    
    async addRecipe(recipe){
        console.log("Adding recipe to firebase");
        try{
            mongoManager = new RecipeMongo();
            updatedHits = await mongoManager.addRecipeHit(recipe.label,1);
            mongoManager.close();
            return this.firebasedb.ref('users/' + firebase.auth().currentUser.uid + '/recipes/').update(refomatter.decomposeIntoComponentsForFirebaseAndDisplay(recipe));
        }
        catch(err){
            console.log(err);
            throw new FirebaseError();
        }
    }

    /*** NON-RETURNABLES ***/

    async getAllRecipesPromise(){
        ref = await this.firebasedb.ref('users/' + firebase.auth().currentUser.uid).child('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            ref.on('value', function(snap) {
                filteredObj = snap.val();
                resolve(filteredObj);
            });
        });
        return filterDataAccordingToRecipes;
    }

    async getRecipePromise(ingredients){
        ref = await this.firebasedb.ref('users/' + firebase.auth().currentUser.uid).child('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            ref.on(ingredients, function(snap) {
                filteredObj = snap.val();
                resolve(filteredObj);
            });
        });
        return filterDataAccordingToRecipes;
    }

    recipify(label,uri,source,healthLabels,url,ingredientLines,totalTime){
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

}

module.exports = { FirebaseManager }