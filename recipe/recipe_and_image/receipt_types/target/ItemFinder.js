const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

const parseImage = require('../../TextClassify.js');
const createTargetQuery = require('./QueryCreater.js')

async function getTargetItem(listOfQueries) {
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

async function findItems(filePath) {
  var loq = await parseImage(filePath);
  queries = createTargetQuery(loq)
  var dtl = await getTargetItem(queries);
  return dtl;
}

module.exports = findItems;
