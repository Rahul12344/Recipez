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

PROTOCOL: Query MongoDB first - query Edamam second - limit to five recipe suggestion - every Edamam query, add to MongoDB if successful