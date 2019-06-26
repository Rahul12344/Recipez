const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

async function parseImage(filePath) {
  try {
    const [result] = await client.textDetection(filePath);
    console.log(result.textAnnotations)
    return detections = result.textAnnotations;
  } catch(error){
    console.log(error);
    return error;
  }
}

module.exports = parseImage;
