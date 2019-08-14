const mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
        unique: false,
    },
    label:  {
        type: String,
        required: true,
        unique: true,
        es_indexed:true
    },
    source: {
        type: String,
        required: true,
        unique: false,
        es_indexed:true
    },
    url: {
        type: String,
        required: true,
        unique: false,
        es_indexed:true
    },
    healthLabels: {
        type: [String],
        required: true,
        unique: false,
        es_indexed:true
    },
    ingredientLines: {
        type: [String],
        required: true,
        unique: false,
        es_indexed:true
    },
    totalTime: {
        type: Number,
        required: true,
        unique: false,
        es_indexed:true
    },
    hits:{
        type: Number,
        required: true,
        unique: false,
        es_indexed:true
    },
  });

  
  module.exports = RecipeSchema;