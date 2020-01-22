const bodyParser = require('body-parser');
const express  = require('express');
const cors = require('cors');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const path = require('path');

const { GetInfo } = require('./RecipeAndImage/ReceiptToItem/ParseText/GetInfo')
const { FirebaseManager } = require('./user_auth/FirebaseManager/FirebaseManager');

const config = require('../config/config.json');v

const firebaseManager = new FirebaseManager();
const receiptFoodInformation = new GetInfo();


const childProcess = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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
    firebaseManager.login(req.query.email, req.query.password)
    .then((loggedInUser) => {
        res.send(loggedInUser);
    })
    .catch((error) => {
        res.send(error);
    });
});

app.post('/register', (req, res) => {
    firebaseManager.signup(req.query.email, req.query.password)
    .then((signedInUser) => {
        res.send(firebaseManager.addUser(signedInUser));
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/logout', (req,res) => {
    firebaseManager.logout()
    .then(() => {
        res.send('Logged Out');
    })
    .catch((error) => {
        console.log(error);
    });
});

app.post('/receipt', upload.single("receipt"), (req, res, next) => {
    receiptFoodInformation.getItemsOnReceipt(req.query.file)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/adduserrecipe', (req,res) => {
    firebaseManager.addRecipe(req.body.recipe)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.post('/addrecipe', (req,res) => {
    firebaseManager.addRecipe(req.body.recipe)
    .then((recipe) => {
        res.send(recipe);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.get('/getuser', (req,res) => {
    res.send(firebaseManager.getuser().currentUser.email);
});

app.get('/getrecipe', (req,res) => {
    firebaseManager.getRecipe(req.query.ingredients)
    .then((recipes) => {
        res.send(recipes);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/getallrecipes', (req,res) => {
    firebaseManager.getAllRecipes()
    .then(recipes => {
        res.send(recipes);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/', (req, res) => {
  res.send("Recipez!");
});

app.listen(process.env.PORT || 3000, () => {
    execShellCommand('./app-env')
    .then((result) => {
        const parents = childProcess.execSync('echo $GOOGLE_APPLICATION_CREDENTIALS', { encoding: 'utf-8' });
        console.log("listening on port 3000");
    })
});
