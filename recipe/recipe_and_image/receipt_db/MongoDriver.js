var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

function driver() {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        return client.db('receipt_db');
    }); 
}

module.exports = driver;