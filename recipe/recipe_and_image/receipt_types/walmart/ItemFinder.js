const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

function createQueries(rdci_codes) {
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

/*
  Specifically for Target - scrape
*/
async function get_target_item(listOfQueries) {
  var i;
  let devtoList = [];
  for(i = 0; i < listOfQueries.length; i++) {
    try {
      const result = await axios.get(listOfQueries[i]['web_name'] + listOfQueries[i]['item']);
      const html = result.data;
      const $ = cheerio.load(html);
      $('.page').each(function(i, elem) {
        devtoList.push($(this).find('h2').text().trim());
      });
    } catch(error){
      console.log(error)
    }
  }
  return devtoList;
}
