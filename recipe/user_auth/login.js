var firebase = require("firebase");


function login(emailCred, passCred) {
    return firebase.auth().signInWithEmailAndPassword(emailCred, passCred);
}

module.exports = login;
