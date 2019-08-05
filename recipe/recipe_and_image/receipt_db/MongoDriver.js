var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

async function driver() {
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        return (client.db('receipt_db'));
    } catch (error) {
        throw error;
    }    
}


module.exports = driver;