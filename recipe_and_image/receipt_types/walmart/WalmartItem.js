const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

// Creates Google Vision API client
const client = new vision.ImageAnnotatorClient();

function parseOutput(textDescriptors) {
  if(textDescriptors.length == 9 && parseInt(textDescriptors))
    return 1;
  return 0;
}

async function parseImage(filePath) {

}

function reformat_rdci(original_rdci) {
  return original_rdci.substring(0, 3) + '-'
  + original_rdci.substring(3,5) + '-'
  + original_rdci.substring(5);
}
