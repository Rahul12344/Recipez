function reformatRDCI(original_rdci) {
    return original_rdci.substring(0, 3) + '-'
    + original_rdci.substring(3,5) + '-'
    + original_rdci.substring(5);
}

module.exports = reformatRDCI;


  