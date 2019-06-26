function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i];
        lines.push(data.lower())
    }
    return lines
}

function getBrandNames(){
  $(document).ready(function() {
      $.ajax({
          type: "GET",
          url: "word-rules-scripts/brand-name.csv",
          dataType: "text",
          success: function(data) {processData(data);}
        });
    });
}
