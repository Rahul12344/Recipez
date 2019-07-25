import scrapy
import configparser
import pandas as pandas
import sys
sys.path.append("/Users/rahulnatarajan/Desktop/Recipez/recipe/scrapers/wikipedia/wikipedia/spiders/")
print(sys.path)

from extract import *

class BrandName(scrapy.Spider):
    name = "wikipedia"
    csvname = ""
    itemClasses={}
    mapper=[]
    extractBrands=[]
    targetcss=[]

    def __init__(self):
        self.conf=configparser.ConfigParser()
        conf=self.conf
        if not conf.read('config.py'):
            print("\'config.py\' not found")
            sys.exit(1)
        confpath=conf.get('default','path')
        if not conf.read(confpath):
            print("\'" + confpath + "\' not found")
            sys.exit(1)

        self.csvname = eval(conf.get('basic','csvname'))
        self.urls = eval(conf.get('basic','urls'))

        self.extractBrands.append({
            itemname : globals().get(funcname)
                for itemname,funcname in conf.items('extract')
        })

        self.targetcss.append({
            itemdef: { itemname : conf.get('css',itemname).strip("\'").strip("\"") for itemname in eval(itemlist) }
                for itemdef,itemlist in conf.items('itemset')
        })

        for itemdef,itemlist in conf.items('itemset'):
            classname=itemdef
            itemlist=eval(itemlist)
            defdict={itemname:scrapy.Field() for itemname in itemlist}
            self.itemClasses[classname]=type(classname,(scrapy.Item,),defdict)

    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(url=url,callback=self.getBrandNames)
    
    def getBrandNames(self,response):
        for itemdef,cssdict in self.targetcss[0].items():
            pipeobj=self.itemClasses.get(itemdef)()
            for itemname,css in cssdict.items():
                if css:
                    itemcontent=self.extractBrands[0][itemname](response.css(css).getall())
                else:
                    itemcontent=self.extractBrands[0][itemname](response.url)
                pipeobj[itemname]=itemcontent
            
            if pipeobj['item']:
                for item in pipeobj['item']:
                    self.mapper.append((item))

            if pipeobj['nextlink']:
                for link in pipeobj['nextlink']:
                    yield scrapy.Request(response.urljoin(link),callback=self.getBrandNames)

            print(self.mapper)

            

            
            