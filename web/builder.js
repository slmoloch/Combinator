
var data = [
  [5,5,7],
  [2,3,4,1,4,3],
  [1,1,2,1,3,1,1,2,2,3],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var graphics = graphics.PrepareGraphics(data);

var cellSize = 40;

var rowCount = data.length;
var width = 960;
var height = cellSize * (rowCount + 1);

var svg = d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + cellSize + "," + (height - cellSize * rowCount - 1) + ")");

var ver = svg
  .selectAll(".version")
    .data(function() { return graphics; })
  .enter()
    .append("g")
      .attr("transform", function (d, i) { return "translate(" + d.position.x * cellSize + "," + d.position.y * cellSize + ")";})
      .on('mouseover', function(d) { UpdatePath(d.graphPath); })
      .on('mouseout', function() { UpdatePath(null); });

ver
    .append("rect")
      .attr("class", function(d) { return "version-rect " + (d.title == "v4" ? "red" : (d.title == "v2" ? "yellow" : "green")); })
      .attr("width", function(d) { return d.length * cellSize })
      .attr("height", cellSize);

ver
    .append("a")
      .attr("class", "label")
      .attr("xlink:href", "http://example.com")
    .append("text")
      .attr("class", "label-text")
      .attr("x", function(d, i) { return cellSize / 2; })
      .attr("y", function(d) { return cellSize / 2; })
      .text(function(d, i) { return d.title; });

    


width = 960;
height = 500;

var force = d3.layout.force()
    .charge(-1250)
    .linkDistance(250)
    .size([width, height]);

var svgGraph = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


var graph = GetGraph();

force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

var link = svgGraph
  .selectAll(".link")
    .data(graph.links)
  .enter()
    .append("line")
    .attr("class", "link");

var node = svgGraph
  .selectAll(".node")
    .data(graph.nodes)
  .enter()
    .append("g")
    .call(force.drag);

node
    .append("circle")
      .attr("class", "node")
      .attr("r", 30)
      .attr("fill", "green");

node
  .append("title")
  .text(function(d) { return d.name; });

node
  .append("a")
    .attr("class", "label")
    .attr("xlink:href", "http://example.com")
  .append("text")
    .attr("class", "label-text")
    .attr("y", function(d) { return 40; })
    .text(function(d, i) { return d.name; });

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});


function UpdatePath(graphPath)
{
  var path = svg
   .selectAll(".graph")
   .remove();

    if(graphPath)
    {
      svg
        //.selectAll(".graph")
        .append("path")
        .attr("class", "graph")
        .attr("d", function(d, i) { return BuildPath(graphPath); });
    }
}

function BuildPath(path)
{
  var out = "M" + path[0][0]*cellSize + "," + path[0][1]*cellSize;

  for (var i = 1; i < path.length; i++) 
  {
    out += "L" + path[i][0]*cellSize + "," + path[i][1]*cellSize;
  };

  return out + "Z"
}


function GetGraph()
{
  return {
  "nodes":[
    {"name":"component1 v1","group":1},
    {"name":"component2 v3","group":1},
    {"name":"component3 v2","group":1},
    {"name":"component4 v14","group":1}
  ],
  "links":[
    {"source":3,"target":2,"value":1},
    {"source":3,"target":1,"value":8},
    {"source":1,"target":0,"value":10},
    {"source":2,"target":0,"value":6}
  ]
};
}