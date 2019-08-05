const buildUrl = require('build-url');
const config = require('../credentials/edamamConfig.js')

function createPath(){
  return buildUrl('https://api.edamam.com', {
    path: 'search',
    queryParams: {
      q: '',
      app_id: config.app_id,
      app_key: config.app_key,
      from: '0',
      to: '100',
      calories: '0-2000',
      health: 'alcohol-free'
    }
  });
}

function createQuery(ingredients) {
  var qParam = "";
  for(var i = 0; i < ingredients.length; i++){
    qParam += (ingredients[i] + ",");
  }
  qParam = 'q=' + qParam.substring(0, qParam.length - 1);
  var query_url = createPath(qParam);
  query_url = query_url.replace("q=", qParam);
  return query_url;
}


module.exports = createQuery;
