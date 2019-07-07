const axios = require('axios');
const cheerio = require('cheerio');

const parseImage = require('../../TextClassify');
const createTargetQuery = require('./QueryCreater.js')
const reformatter = require('./TargetItem.js')

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
      return error;
    }
  }
  return devtoList;
}

async function findItems(filePath) {
  try {
    var loq = await parseImage(filePath);
    loq =  reformatter(loq);

    queries = createTargetQuery(loq)
    var dtl = await getTargetItem(queries);
    return dtl;
  }
  catch (error) {
    return error;
  }
}

module.exports = findItems;
