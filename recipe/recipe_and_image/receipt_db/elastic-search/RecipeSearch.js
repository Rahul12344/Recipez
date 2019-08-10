const { Client } = require('elasticsearch');

class ElasticSearchManager{

    constructor(){
        this.ELASTIC_HOST = "http://localhost:9200"
        this.client = new Client({ node: this.ELASTIC_HOST+'recipes/recipe' });
    }

    async search(ingredients){
        const recipePayload = await this.client.search({
            body: {
                query: {
                    bool:{
                        must: this._createQuery(ingredients)
                    }
                }
            }
          });
          return recipePayload.hits.hits;
    }

    async nameSearch(recipeName){
        const recipePayload = await this.client.search({
            body: {
                query: {
                    multi_match:{
                        query: recipeName,
                        fuzziness: 1,
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

const esm = new ElasticSearchManager();
//esm.search(['chicken','bread']);
esm.nameSearch('Chicken Scaloppini');


module.exports = { ElasticSearchManager };
