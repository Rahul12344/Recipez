const bodyParser = require('body-parser');
const express  = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const firebase = require('firebase');
const admin = require('firebase-admin');

const serviceAccount = require("./user_auth/credentials/serviceAccountKey.json");
const fbinit = require("./user_auth/db_controllers/db_manager");
const login = require("./user_auth/db_controllers/login");
const signup = require("./user_auth/db_controllers/signup");
const logout = require("./user_auth/db_controllers/logout");
const getuser = require("./user_auth/db_controllers/getuser");

const recipe = require("./recipe_and_image/receipt_to_recipe/Recipe.js")

const exec = require('child_process').exec;
child = exec('source ./recipe/app-env',
    function (error, stdout, stderr) {
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

fbinit.init;
fbinit.initAdmin;

app.post('/login', (req, res) => {
    console.log("login");
    login(req.query.email, req.query.password)
    .then((loggedInUser) => {
        res.send(loggedInUser);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/register', (req, res) => {
    signup(req.query.email, req.query.password)
    .then((signedInUser) => {
        res.send(signedInUser);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/logout', (req,res) => {
    logout()
    .then(() => {
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/getuser', (req,res) => {
    res.send(getuser().currentUser.email);
});

app.post('/getrecipe', (req,res) => {
  recipe()
  .then((recipes) => {
    res.send(recipes);
  })
  .catch((error) => {
    console.log(error);
  });
});

app.get('/', (req, res) => {
  res.send("");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
