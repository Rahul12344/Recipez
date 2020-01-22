#!/bin/bash

export ELASTIC_HOST="http://localhost:9200" && echo "ELASTIC_HOST=$ELASTIC_HOST" >> ~/.bash_profile
export PYTHON_SERVICE="http://localhost:5000" 

cd ./recipe && npm install
cd ./classification && pip install
