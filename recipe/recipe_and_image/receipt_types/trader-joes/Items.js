const findItems = require('./ItemFinder.js');

async function compile(filePath) {
  try {
    items = await findItems(filePath);
    return items.sort();
  }
  catch (error) {
    return error;
  }
}

module.exports = compile
