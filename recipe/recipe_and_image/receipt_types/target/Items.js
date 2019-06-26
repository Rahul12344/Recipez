const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

const findItems = require('./ItemFinder.js')l

async function compile(filePath) {
  items = await findItems(filePath);
  var i;
  let parsedNames = [];
  for(i = 0; i < names.length; i++) {
    parsedNames.push(charParser(names[i].split('-')[0]));
  }
  return parsedNames.sort();
}

module.exports = compile
