const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/";
const RECEIPT_DB_URL = "mongodb://localhost:27017/receipt_db"

async function driver() {
    try {
        client = mongoose.createConnection(RECEIPT_DB_URL, { useNewUrlParser: true });
        return client;
    } catch (error) {
        throw error;
    }  
}

module.exports = driver;