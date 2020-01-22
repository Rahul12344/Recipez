# Data structure

Hosted on MongoDB

{
    [ingredients]
    {
        [other_ingredients]
        {
            recipe name
            {
                recipe
            }
        }
    }
}

{
    recipe
    {
        [instructions]
        timeEstimate
        link
    }
}

PROTOCOL: Query MongoDB first - query Edamam second - limit to five recipe suggestion - for every Edamam query, add to MongoDB if successful

Additionally, most likely need to add some sort of abstracted search functionality - most likely through SOLR - to make searching and filtering more robust