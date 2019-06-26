const vision = require('@google-cloud/vision');
const axios = require('axios');
const cheerio = require('cheerio');
const unirest = require('unirest');

async function compile(filePath) {
  images = await parseImage(filePath);
  queries = createQueries(images);
  names = await getItemName(queries);
  var i;
  let parsedNames = [];
  for(i = 0; i < names.length; i++) {
    parsedNames.push(charParser(names[i].split('-')[0]));
  }

  var j;
  for(i = 0; i < parsedNames.length; i++) {
    words = parsedNames[i].split(' ');
    finishedString = '';
    var j;
    for(j = 0; j < words.length; j++) {
      inDict = await isInDictionary(words[j]);
      if(inDict) {
        partOfSpeech = await partOfSpeechAnalysis(words[j]);
        if(partOfSpeech != 'adjective') {
          finishedString = finishedString + words[j] + ' ';
        }
      }
    }
    parsedNames[i] = (finishedString.toLowerCase()).substring(0, finishedString.length-1);
  }

  return parsedNames;
}
