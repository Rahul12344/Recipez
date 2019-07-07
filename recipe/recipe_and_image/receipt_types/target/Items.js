const findItems = require('./ItemFinder.js');

async function compile(filePath) {
  try {
    items = await findItems(filePath);
    var i;
    let parsedNames = [];
    for(i = 0; i < names.length; i++) {
      parsedNames.push((items[i].split('-')[0]));
    }
    return parsedNames.sort();
  }
  catch (error) {
    return error;
  }
}

module.exports = compile
