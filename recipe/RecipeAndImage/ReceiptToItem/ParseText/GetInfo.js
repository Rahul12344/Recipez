const { FindText } = require('../../TextClassify');
const config = require('../../../../config/config.json');

class GetReceiptInfo {

    async associateAndFilter(allWords){
        foodWords = allWords.filter(word => await this._filter(word));
    }

    async getItemsOnReceipt(image){
        storeObj =  await this.getItemType(image);
        if(storeObj["RECEIPT_TYPE"][0] == 'C'){
            items = await this.getCodedItem(this.createCodedQuery(storeObj["RECEIPT_TYPE"][2], storeObj["RECEIPT_TYPE"][1], "sku"));
            if(items)
                return items;
            items = await this.getCodedItem(this.createCodedQuery(storeObj["RECEIPT_TYPE"][2], storeObj["RECEIPT_TYPE"][1], "upc"));
            if(items)
                return items;
        }
        else{
            items = await this.getUncodedItem(image);
            return items.sort();
        }
    }

    async getItemType(image) {
        detections = await FindText.parseImage(image);
        storename = detections[1].description.toLowerCase();

        let rdciCodes = [];
        detections.forEach(text => {
            if(this.isRDCI(text.description))
                rdciCodes.push(text.description);
        });
        if(rdciCodes){
            return {"RECEIPT_TYPE" : ["C", storename, rdciCodes]};
        }
        else{
            return {"RECEIPT_TYPE" : ["NC", storename]};
        }

    }

    async getUncodedItem(image) {
        detections = await FindText.parseImage(image);

        let textGroup = [];
        let text = [];

        text.push(detections[0].description);
        textGroup = (text[0].split('\n'))
        textGroup.shift();
        textGroup.sort();
        for(var i = 1; i < textGroup.length; i++) {
          if(isNaN(textGroup[i]) && textGroup[i][0] != '$' && isNaN(textGroup[i][0])) {
            textGroup.splice(0,i);
            break;
          }
        }
        textGroup = textGroup.slice(0, textGroup.length-2);
        return textGroup;
    }

    async getCodedItem(codedQueries) {
        let decodedItems = [];
        for(var queryItem = 0; queryItem < codedQueries.length; queryItem++) {
          try {
            const result = await axios.get(codedQueries[queryItem]['web_name'] + codedQueries[queryItem]['item']);
            const html = result.data;
            const $ = cheerio.load(html);
            $('.page').each(function(queryItem, elem) {
                decodedItems.push($(this).find('h2').text().trim());
            });
          } catch(error){
            return error;
          }
        }
        return decodedItems;
      }

    createCodedQuery(rdciCodes, storeName, type) {
        listOfQueries = [];
      
        query = {
          'web_name': 'https://brickseek.com/' + storeName + '-inventory-checker/',
          'item': '?' + type + '=',
        };
      
        var i;
        for(i = 0; i < rdciCodes.length; i++) {
          listOfQueries.push({
            'web_name': this.query['web_name'],
            'item': this.query['item'] + this.reformatRDCI(rdciCodes[i])
          });
        }
      
        return listOfQueries;
    }

    reformatRDCI(original_rdci) {
        return original_rdci.substring(0, 3) + '-'
        + original_rdci.substring(3,5) + '-'
        + original_rdci.substring(5);
    }

    isRDCI(textDescriptors) {
        if(textDescriptors.length == 9 && parseInt(textDescriptors))
          return 1;
        return 0;
    }

    async _filter(word){
        res = await axios.get(config.PYTHON_HOST)
    }
}
module.exports = { GetReceiptInfo }