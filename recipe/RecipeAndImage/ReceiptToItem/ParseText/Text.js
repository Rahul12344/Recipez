const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

class FindText {
    async  parseImage(filePath) {
        try {
          const [result] = await client.textDetection(filePath);
          return detections = result.textAnnotations;
        } catch(error){
          return error;
        }
      }
}


module.exports = {FindText};