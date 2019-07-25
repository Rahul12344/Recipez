import re

def extractitem(responseHTMLList):
    fixedList=[]
    if responseHTMLList:
        for responseHTML in responseHTMLList:
            responseText=re.search(">.*<",responseHTML,re.DOTALL)
            if responseText:
                responseText=responseText.group(0)[1:-1].strip()
                responseText=re.sub(r'<[^>]*>','',responseText)
                responseText=re.sub(r'&nbsp','',responseText)
                responseText=re.sub(u'\u2019','',responseText)
                responseText=re.sub(u'\u2018','',responseText)
                responseText=re.sub(u'&amp;','',responseText)
            fixedList.append(responseText)
    return fixedList

def extracthref(responseHTML):
    return responseHTML