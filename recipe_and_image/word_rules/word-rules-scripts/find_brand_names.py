import requests

r = requests.get("https://en.wikipedia.org/wiki/List_of_brand_name_food_products")

from bs4 import BeautifulSoup
import re

soup = BeautifulSoup(r.text, 'html.parser')

brand_names = soup.find_all('li', attrs={})

#f_query = soup.find_all('a', attrs={'class':'mw-redirect'})
#for query in f_query:
#    process_r = requests.get(query)
#    brand_names.append(soup.find_all('li', attrs={}))

brand_tuple_list = []
for brand in brand_names:
    brand = str(brand)
    brand = re.sub('^<li[^>].*','',brand)
    brand = re.sub('^<li>','',brand)
    brand = re.sub('</li>$','',brand)
    brand = re.sub('<[^>]*>','',brand)
    brand = re.sub('^<a href.+>','',brand)
    brand_tuple_list.append((brand))


import pandas as pd
df = pd.DataFrame(brand_tuple_list, columns=['brand'])
df.to_csv('brand-name.csv', index=False, encoding='utf-8')
