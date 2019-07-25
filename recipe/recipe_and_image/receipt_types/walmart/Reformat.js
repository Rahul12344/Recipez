function reformat_upc(original_upc) {
    return original_upc.substring(0, 3) + '-'
    + original_upc.substring(3,5) + '-'
    + original_upc.substring(5);
}
  
module.exports = reformat_upc;