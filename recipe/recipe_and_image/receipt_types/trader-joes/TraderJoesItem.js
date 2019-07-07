const parseImage = require('../../TextClassify');
 
/*
  Need sample receipts
*/

async function getBoundingBox(detections) {
  let bounding_box = [];
  detections.forEach(detection => {
    bounding_box.push(detection.boundingPoly.vertices);
  });
  return bounding_box;
}

module.exports = getBoundingBox;
