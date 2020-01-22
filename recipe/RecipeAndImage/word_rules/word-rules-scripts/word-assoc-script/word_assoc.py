# Goal - extract text of various recipes
# Find common food word associations

# Use dataset of around 50 recipes to find pattern

import numpy as np
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
import spacy
import string

def _removeNonAscii(s): return "".join(i for i in s if ord(i)<128)

from bs4 import BeautifulSoup
rec_urls = []
