function createPath(){
  return buildUrl('https://api.edamam.com', {
    path: 'search',
    queryParams: {
      q: '',
      app_id: '37558882',
      app_key: '0d32feed48cc030d66dc9712495d1e1d',
      from: '0',
      to: '5',
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
