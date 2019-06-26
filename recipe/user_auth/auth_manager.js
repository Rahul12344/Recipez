var admin = require("firebase-admin");
var firebase = require("firebase");

var serviceAccount = require("./credentials/serviceAccountKey.json");
var firebaseConfig = require("./credentials/export-key.js")

const firebaseConfig = firebaseConfig();

function init() {
    firebase.initializeApp(firebaseConfig);
}

function initAdmin() {
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://vitadb-c40c2.firebaseio.com/"
    });
}

exports.method = init();
exports.method = initAdmin();
