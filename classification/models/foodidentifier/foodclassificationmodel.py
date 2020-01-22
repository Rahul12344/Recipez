import os
import pandas as pd
import numpy
import matplotlib.pyplot as plt
import string
import re
from gensim import corpora
from gensim.models import Phrases
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

from ds_voc.text_processing import TextProcessing

from gensim.models import Word2Vec

import csv

class FoodWord:

    foodWords = []

    def __init__(self):
        foods = csv.reader(csv_file, delimiter=',')
        for food in foods:
            self.foodWords.append(food)

    def search(self, word):
        try:
            foodWords.index(word)
            return True
        except ValueError:
            return False