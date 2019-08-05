/*
  Check db (MongoDB) for recipes containing found items
  Sort items alphabetically
*/
const receiptDBFunctions = require('../receipt_db/ReceiptDB.js');


async function getRecipeFromDB(ingredients){
  try{
    driver = await receiptDBFunctions.receiptDBDriver();
    dbResult = await receiptDBFunctions.queryRecipe(driver, ingredients);

    return dbResult; 
  }
  catch(err){
    return err;
  }
}

module.exports = getRecipeFromDB;