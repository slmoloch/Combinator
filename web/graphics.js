(function(exports){

exports.PrepareGraphics = function(data)
{
  var graphics = [];

  for(i = 0; i < data.length; i++)
  {
    var row = [];
    var vertical = 0;
    
    for(j = 0; j < data[i].length; j++)
    {
      row = { 
        position: {x: vertical, y: i}, 
        length: data[i][j],
        title: "v" + j,
        graphPath: exports.PreparePath(data, vertical)
      };

      graphics.push(row);

      vertical += data[i][j]; 
    }
  }

  return graphics;
}

exports.PreparePath = function(data, cutVertical)
{
  // get all versions on the vertica
  var versions = [];
  for (var i = 0; i < data.length; i++) 
  {
    var vertical = 0;

    for (var j = 0; j < data[i].length; j++) 
    {
      var length = data[i][j];
      if(vertical <= cutVertical && (vertical + length) > cutVertical)
      {
        versions.push({
          start: {x: vertical, y: i}, 
          length: length});
        
        break;
      }

      vertical += data[i][j];
    };
  };

  var path = [];
  //down
  for (var i = 0; i < versions.length; i++) 
  {
    path.push([versions[i].start.x, versions[i].start.y]);
    path.push([versions[i].start.x, versions[i].start.y + 1]);
  };

  //up
  for (var i = versions.length - 1; i >= 0; i--) 
  {
    path.push([versions[i].start.x + versions[i].length, versions[i].start.y + 1]);
    path.push([versions[i].start.x + versions[i].length, versions[i].start.y]);
  };

  return path;
}

})(typeof exports === 'undefined'? this['graphics']={}: exports);