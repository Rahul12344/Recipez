const admin = require("firebase-admin");
const firebase = require("firebase");

const serviceAccount = require("../credentials/serviceAccountKey.json");
const firebaseConfig = require("../credentials/export-key.js");

const refomatter = require('../../RecipeAndImage/ReceiptDB/DecomposeRecipe');

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
            databaseURL: this.config.databaseURL
        });
    }

    _facebookInit(){
        
    }

    _close(){
        firebase.auth().signOut();
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
        return firebase.auth().createUserWithEmailAndPassword(emailCred, passCred)
    }

    addUser(signedInUser){
        this.firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/profile/").set(JSON.parse(JSON.stringify(firebase.auth().currentUser)));
        this.firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/recipes/").set('');
        return signedInUser;
    }

    async getAllRecipes(){
        var recipeDict = {};
        await this.getAllRecipesPromise()
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
        await this.getRecipePromise(ingredients)
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
            return this.firebasedb.ref('users/' + firebase.auth().currentUser.uid + '/recipes/').update(refomatter.decomposeIntoComponentsForFirebaseAndDisplay(recipe));
        }
        catch(err){
            console.log(err);
            throw new FirebaseError();
        }
    }

    /*** NON-RETURNABLES ***/

    async getAllRecipesPromise(){
        let ref = await this.firebasedb.ref('users/' + firebase.auth().currentUser.uid).child('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            ref.on('value', function(snap) {
                let filteredObj = snap.val();
                resolve(filteredObj);
            });
        });
        return filterDataAccordingToRecipes;
    }

    async getRecipePromise(ingredients){
        let ref = await this.firebasedb.ref('users/' + firebase.auth().currentUser.uid).child('recipes');
        var filterDataAccordingToRecipes = new Promise( function(resolve, reject) {
            ref.on(ingredients, function(snap) {
               let filteredObj = snap.val();
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