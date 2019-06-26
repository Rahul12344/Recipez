const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

async function isInDictionary(word) {
  try {
    result = await unirest.get("https://wordsapiv1.p.mashape.com/words/" + word)
    .header("X-Mashape-Key", "63b974140fmsh6c4b67feecef3cbp12a7edjsnaf936681e241")
    .header("Accept", "application/json");
  } catch(error) {
    console.log(error);
  }

  if(result.body['results'] != null)
    return true;
  return false;
}
