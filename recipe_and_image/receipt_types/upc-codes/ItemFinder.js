const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

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
        devtoList.push($(this).find('h4').text().trim());
      });
    } catch(error){
      console.log(error)
    }
  }
  return devtoList;
}
