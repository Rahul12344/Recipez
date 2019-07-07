const reformat_rdci = require('./Reformat.js')

function createTargetQuery(rdci_codes) {
  listOfQueries = [];

  query = {
    'web_name': 'https://brickseek.com/target-inventory-checker/',
    'item': '?sku=',
  };

  var i;
  for(i = 0; i < rdci_codes.length; i++) {
    listOfQueries.push({
      'web_name': this.query['web_name'],
      'item': this.query['item'] + reformat_rdci(rdci_codes[i])
    });
  }

  return listOfQueries;
}

module.exports = createTargetQuery
