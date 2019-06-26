const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

// Creates Google Vision API client
function parseOutput(textDescriptors) {
  if(textDescriptors.length == 9 && parseInt(textDescriptors))
    return 1;
  return 0;
}

function reformatRDCI(original_rdci) {
  return original_rdci.substring(0, 3) + '-'
  + original_rdci.substring(3,5) + '-'
  + original_rdci.substring(5);
}

function rdciCodes(detections) {
  let rdci_codes = [];

  detections.forEach(text => {
    if(parseOutput(text.description))
      rdci_codes.push(text.description);
    });
  }

  return rdci_codes;
}
