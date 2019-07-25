var firebase = require("firebase");

function logout() {
    return firebase.auth().signOut();
}

module.exports = logout;
