const bodyParser = require('body-parser');
const express  = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const firebase = require('firebase');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const path = require('path');

const fbinit = require("./user_auth/auth_manager");
const login = require("./user_auth/login");
const signup = require("./user_auth/signup");
const logout = require("./user_auth/logout");
const getuser = require("./user_auth/getuser");
const firebaseRecipe = require('./user_auth/FirebaseRecipes/FirebaseRecipes.js');
const recipe = require('../recipe/recipe_and_image/receipt_to_recipe/Recipe.js');

const { FirebaseManager } = require('./user_auth/FirebaseManager/FirebaseManager');
//const fbm = new FirebaseManager();


const childProcess = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

fbinit.init;
fbinit.initAdmin;

const firebasedb = admin.database();

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout? stdout : stderr);
     });
    });
   }

app.post('/login', (req, res) => {
    login(req.query.email, req.query.password)
    .then((loggedInUser) => {
        console.log("LOGGING IN");
        res.send(loggedInUser);
    })
    .catch((error) => {
        res.send('');
    });
});

app.post('/register', (req, res) => {
    console.log("Registering");
    signup(req.query.email, req.query.password)
    .then((signedInUser) => {
        res.send(signedInUser);
        firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/profile/").set(JSON.parse(JSON.stringify(firebase.auth().currentUser)));
        firebasedb.ref('users/' + firebase.auth().currentUser.uid + "/recipes/").set('');
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/logout', (req,res) => {
    logout()
    .then(() => {
        res.send('Logged Out');
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/receipttorecipe', upload.single("receipt"), (req, res, next) => {
    console.log('RECIPE')
    recipe.recipe(req.query.file)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/adduserrecipe', (req,res) => {
    firebaseRecipe.addRecipe(req.body.recipe)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/addrecipe', (req,res) => {
    firebaseRecipe.addRecipe(firebasedb,firebase,req.body.recipe)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.get('/getuser', (req,res) => {
    res.send(getuser().currentUser.email);
});

app.get('/getrecipe', (req,res) => {
    firebaseRecipe.getRecipe(req.query.ingredients)
    .then((recipes) => {
        res.send(recipes);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/getallrecipes', (req,res) => {
    firebaseRecipe.getAllRecipes(firebasedb,firebase)
    .then(recipes => {
        res.send(recipes);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/', (req, res) => {
  res.send("Recipes");
});

app.listen(process.env.PORT || 3000, () => {
    execShellCommand('./app-env')
    .then((result) => {
        const parents = childProcess.execSync('echo $GOOGLE_APPLICATION_CREDENTIALS', { encoding: 'utf-8' });
        console.log("listening on port 3000");
    })
});
