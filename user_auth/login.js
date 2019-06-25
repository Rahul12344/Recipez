var admin = require("firebase-admin");
var firebase = require("firebase");

var serviceAccount = require("../serviceAccountKey.json");

function login(emailCred, passCred) {
    return firebase.auth().signInWithEmailAndPassword(emailCred, passCred);
}

module.exports = login;
