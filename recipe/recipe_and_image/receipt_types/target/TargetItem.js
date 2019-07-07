function parseOutput(textDescriptors) {
  if(textDescriptors.length == 9 && parseInt(textDescriptors))
    return 1;
  return 0;
}

function rdciCodes(detections) {
  let rdci_codes = [];

  detections.forEach(text => {
    if(parseOutput(text.description))
      rdci_codes.push(text.description);
    });

  return rdci_codes;
}

module.exports = rdciCodes;
