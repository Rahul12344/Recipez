const axios = require('axios');
const cheerio = require('cheerio');

const parseImage = require('../../TextClassify');
const createTargetQuery = require('./QueryCreater.js')
const reformatter = require('./TraderJoesItem.js')
const isOnSlope = require('../../../bounds/bounds-manager/BoundsManager.js'); 
/*
  Need sample receipts
*/
async function getTraderJoesItems(bounds) {
  let text_group = [];
  let text = [];
  text.push(detections[0].description);
  text_group = (text[0].split('\n'))
  text_group.shift();
  text_group.sort();
  for(var i = 1; i < text_group.length; i++) {
    if(isNaN(text_group[i]) && text_group[i][0] != '$' && isNaN(text_group[i][0])) {
      text_group.splice(0,i);
      break;
    }
  }
  text_group = text_group.slice(0, text_group.length-2);
  return text_group;
}

async function findItems(filePath) {
  try {
    var loq = await parseImage(filePath);
    bounds =  reformatter(loq);
  
    var dtl = await getTraderJoesItems(bounds);
    return dtl;
  }
  catch (error) {
    return error;
  }
}

module.exports = findItems;