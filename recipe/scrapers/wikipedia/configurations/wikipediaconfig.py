[basic]
csvname="brandname.csv"
urls=["https://en.wikipedia.org/wiki/List_of_brand_name_food_products"]

[css]
item='.div-col li a'
nextlink='.hatnote a ::attr(href)'

[extract]
item=extractitem
nextlink=extracthref

[itemset]
items=['item','nextlink']