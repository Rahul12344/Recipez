const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

// Creates Google Vision API client
const client = new vision.ImageAnnotatorClient();

/*
  Google Vision API - requires Google credentials
*/
async function parseImage(filePath) {
  try {
    const [result] = await client.textDetection(filePath);
    return detections = result.textAnnotations;
  } catch(error){
    return error
  }
}

module.exports = parseImage;
