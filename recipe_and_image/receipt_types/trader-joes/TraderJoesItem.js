const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

async function targetItems(filePath) {
  let rdci_codes = [];

  try {
    const [result] = await client.textDetection(filePath);
    const detections = result.textAnnotations;
    detections.forEach(text => {
      if(parseOutput(text.description))
        rdci_codes.push(text.description);
    });
  } catch(error){
    return
  }

  return rdci_codes;
}
