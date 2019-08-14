const { Client } = require('elasticsearch');

class ElasticSearchManager{

    constructor(){
        this.ELASTIC_HOST = "http://localhost:9200"
        this.client = new Client({ node: this.ELASTIC_HOST+'recipes/recipe' });
    }

    async search(ingredients){
        const recipePayload = await this.client.search({
            body: {
                from: 0, size: 100,
                query: {
                    bool:{
                        must: this._createQuery(ingredients)
                    }
                }
            }
          });
          console.log(recipePayload.hits.hits);
          return recipePayload.hits.hits;
    }

    async nameSearch(recipeName){
        const recipePayload = await this.client.search({
            body: {
                query: {
                    multi_match:{
                        query: recipeName,
                        fuzziness: 2,
                    }
                }
            }
          });
          return recipePayload.hits.hits[0];
    }

    _filter(payload){
        var filter = [];
        payload.forEach((response) => {
            filter.push(response._source);
        });
        return filter;
    }

    _filterIndividual(indivPayload){
        var filter = {};
        filter = indivPayload._source;
        return filter;
    }

    _createQuery(ingredients){
        var musts = [];
        ingredients.forEach((ingredient) => {
            musts.push(
                {
                    multi_match:{
                        query: ingredient,
                        fuzziness: 1,
                    }
                }
            )
        });
        return musts;
    }

}

module.exports = { ElasticSearchManager };
