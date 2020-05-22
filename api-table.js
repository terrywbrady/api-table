$(document).ready(function(){
  createTable(
    ["cat", "dog", "bird"],
    ["", "num", "foo"],
    [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 'cow'],
      [1, 2, 'bird'],
      [4, 5, 6]
    ]
  );
});

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
}

function createCell(v, type, isHeader) {
  var cell = isHeader ? $("<th/>") : $("<td/>");
  cell.addClass(type);
  format(cell, v, isHeader ? '' : type);
  return cell;
}

function format(cell, v, type) {
  if (type == 'foo') {
    $("<a href='#foo'/>").text(v).appendTo(cell);
  } else {
    cell.text(v);
  }
}
