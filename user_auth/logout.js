var admin = require("firebase-admin");
var firebase = require("firebase");

var serviceAccount = require("../serviceAccountKey.json");

function logout() {
    return firebase.auth().signOut();
}

module.exports = logout;
