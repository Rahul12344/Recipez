# Recipe

Backend structure of recipe app - focus on NLP and text analysis to determine which words are valid to be used
in potential recipe searches. Text vision is implemented through the Google Vision API hosted on Google Cloud,
as is user authentication through Google Cloud's firebase product. (FOR NOW) MongoDB is used to hold recipes
found, while firebase holds recipes the user saves personally. (TODO) The MongoDB database is hosted on AWS - 
a NoSQL access was preferred due to the relatively unstructured and JSON-friendly nature of recipes.

(TODO - Areas for optimization)
Multithread/lock API queries involving ingredients-to-recipe to speed process up significantly - introduce a 
thread-per-permutation.

Write implementation of Edamam API using web scraping tools as well as Java querying (with multithreading) - TODO
to figure out data structure supporting quick access of recipe data