function createUPCQuery(upc_codes) {
  listOfQueries = [];

  query = {
    'web_name': 'https://www.barcodelookup.com/',
    'item': '',
  };

  var i;
  for(i = 0; i < upc_codes.length; i++) {
    listOfQueries.push({
      'web_name': this.query['web_name'],
      'item': this.query['item'] + upc_codes[i]
    });
  }

  return listOfQueries;
}
