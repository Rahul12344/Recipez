var admin = require("firebase-admin");
var firebase = require("firebase");

var serviceAccount = require("./credentials/serviceAccountKey.json");

function getUser() {
    return firebase.auth();
}

module.exports = getUser;
