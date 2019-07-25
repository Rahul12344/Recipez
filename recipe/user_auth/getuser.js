var firebase = require("firebase");

function getUser() {
    return firebase.auth();
}

module.exports = getUser;
