var admin = require("firebase-admin");
var firebase = require("firebase");

function signup(emailCred, passCred) {
    return firebase.auth().createUserWithEmailAndPassword(emailCred, passCred);
}

module.exports = signup;
