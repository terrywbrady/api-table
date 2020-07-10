$(document).ready(function(){
  var queries = getParams();
  var file = ('json' in queries) ? queries['json'] : '';
  var url = ('url' in queries) ? queries['url'] : '';
  var url = ('encurl' in queries) ? decodeURIComponent(queries['encurl']) : url;

  if (file != '') {
    showData(file);
    $("#menu").hide();
  } else if (url != '') {
    showUrl(url);
    $("#menu").hide();
  } else {
    $("#menu").show();
  }
});

function getParams(){
  var queries = {};
  if (document.location.search == "") {
    return queries;
  }
  $.each(document.location.search.substr(1).split('&'),function(c,q){
    var i = q.split('=');
    queries[i[0].toString()] = i[1].toString();
  });
  return queries;
}

function showData(file) {
  var url = "data/" + file + ".json";
  showUrl(url);
}

function showUrl(url) {
  $.ajax({
    dataType: "json",
    url: url,
    success: function(data) {
      createTable(
        data.headers,
        data.types,
        data.data
      )
    },
    complete: function(xhr, status) {
      //alert(status);
    }
  });
}

function createTable(headers, types, data) {
  $("#data-table")
    .empty()
    .append($("<thead/>"))
    .append($("<tbody/>"));
  var tr = $("<tr/>").appendTo("#data-table thead");
  for(var c=0; c<headers.length; c++) {
    tr.append(createCell(headers[c], types[c], true));
  }
  for(var r=0; r<data.length; r++) {
    tr = $("<tr/>").appendTo("#data-table tbody");
    for(var c=0; c<data[r].length; c++) {
      tr.append(createCell(data[r][c], types[c], false));
    }
  }
  sorttable.makeSortable($("#data-table")[0]);
}

function createCell(v, type, isHeader) {
  var cell = isHeader ? $("<th/>") : $("<td/>");
  cell.addClass(type);
  format(cell, v, isHeader ? '' : type);
  return cell;
}

function format(cell, v, type) {
  if (type == 'foo') {
    $("<a href='?json=foo'/>").text(v).appendTo(cell);
  } else {
    cell.text(v);
  }
}
