const admin = require("firebase-admin");
const firebase = require("firebase");

const serviceAccount = require("./credentials/serviceAccountKey.json");
const firebaseConfig = require("./credentials/export-key.js")

const config = firebaseConfig();

function init() {
    firebase.initializeApp(config);
}

function initAdmin() {
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.databaseURL
    });
}

exports.method = init();
exports.method = initAdmin();
