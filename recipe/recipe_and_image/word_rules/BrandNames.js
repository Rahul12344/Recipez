const csv = require('csvtojson');

async function getBrandNames(){
    listOfBrands = [];
    try {
        await csv()
            .fromFile('./word-rules-scripts/brand-name.csv')
            .then((jsonObj)=>{
            listOfBrands.push(jsonObj);
        });
        return listOfBrands;
    }
    catch (error) {
        return error;
    }
}

module.exports = getBrandNames;
